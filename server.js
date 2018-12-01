require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const pgp = require("pg-promise")();
const app = express();
const db = pgp({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

app.get("/", function(req, res) {
  res.render("index");
});

// get dishes
app.get("/api/dish", function(req, res) {
  db.any("SELECT dish.id, dish.name, dish.price FROM dish")
    .then(function(data) {
      let dishes = {};

      data.forEach(dish => {
        dishes[dish.id] = dish;
      });
      res.json(dishes);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get transaction
app.get("/api/transaction", function(req, res) {
  db.any(
    `
  SELECT * FROM transaction
  `
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get transaction by id
app.get("/api/transaction/:id", function(req, res) {
  const id = req.params.id;
  db.any(
    `
    SELECT dish_transaction.order_id, dish.name, dish.id, dish.price, dish_transaction.quantity
    FROM dish_transaction, dish, transaction
    WHERE transaction.id = dish_transaction.order_id
      AND dish_transaction.dish_id = dish.id
      AND transaction.id = $1
    `,
    [id]
  )
    .then(function(data) {
      let transaction = { orderId: data[0].order_id, subTotal: 0, dishes: {} };
      console.log(data);
      data.forEach(dish => {
        transaction.dishes[dish.id] = {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: dish.quantity
        };
        transaction.subTotal += Number(dish.price) * Number(dish.quantity);
      });

      res.json(transaction);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get dish by id
app.get("/api/dish/:id", function(req, res) {
  const id = req.params.id;
  db.any(`SELECT * from dish WHERE dish.id = $1`, [id])
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get dishes by category
app.get("/api/category", function(req, res) {
  db.any(
    `
      SELECT dish.category_id, category.category, dish.id, dish.name, dish.price 
      FROM dish, category
      WHERE dish.category_id = category.id
    `
  )
    .then(function(data) {
      let categories = {};

      data.forEach(dish => {
        let dishToSave = {
          dishId: dish.id,
          name: dish.name,
          price: dish.price
        };
        if (categories.hasOwnProperty(dish.category)) {
          categories[dish.category].dishes[dish.id] = dishToSave;
        } else {
          categories[dish.category] = {
            categoryId: dish.category_id,
            categoryName: dish.category,
            dishes: { [dish.id]: dishToSave }
          };
        }
      });
      res.json(categories);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// post order
app.post("/api/transaction", (req, res) => {
  // 1. insert into "order" table
  db.one(`INSERT INTO transaction (status) VALUES ('placed') RETURNING id`)
    .then(result => {
      const orderId = result.id;
      const { items } = req.body;

      // 2. insert into "order_item" table for each item
      return Promise.all(
        items.map(item => {
          return db.none(
            `INSERT INTO dish_transaction (dish_id, order_id, quantity) VALUES ($1, $2, $3)`,
            [item.dishId, orderId, item.quantity]
          );
        })
      ).then(() => orderId);
    })
    .then(orderId => {
      db.any(
        `
        SELECT dish_transaction.order_id, dish.name, dish.id, dish.price, dish_transaction.quantity
        FROM dish_transaction, dish, transaction
        WHERE transaction.id = dish_transaction.order_id
        AND dish_transaction.dish_id = dish.id
        AND transaction.id = $1
        `,
        [orderId]
      )
        .then(function(data) {
          let transaction = {
            orderId: data[0].order_id,
            subTotal: 0,
            dishes: {}
          };
          data.forEach(dish => {
            transaction.dishes[dish.id] = {
              dishId: dish.id,
              name: dish.name,
              price: dish.price,
              quantity: dish.quantity
            };
            transaction.subTotal += Number(dish.price) * Number(dish.quantity);
          });

          res.json(transaction);
        })
        .catch(function(error) {
          res.json({ error: error.message });
        });
    })
    .catch(error => res.json({ error: error.message }));
});

const port = process.env.PORT || 8080;
app.listen( port, function(){
  console.log(`Listening on port number ${port}`);
});