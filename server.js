require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const pgp = require("pg-promise")();
const app = express();
const db = pgp({
  host: "localhost",
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
  db.any("SELECT * FROM dish")
    .then(function(data) {
      res.json(data);
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

// get transactions by id
app.get("/api/transaction/:id", function(req, res) {
  const id = req.params.id;
  db.any(
    `
  SELECT dish_transaction.order_id, dish.name, dish.price, dish_transaction.quantity
  FROM dish_transaction, dish, transaction
  WHERE transaction.id = dish_transaction.order_id
    AND dish_transaction.dish_id = dish.id
    AND transaction.id = $1
  `,
    [id]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get dish by id
app.get("/api/dish/:id", function(req, res) {
  const id = req.params.id;
  db.any(
    `
    SELECT * from dish
    WHERE dish.id = $1
  `,
    [id]
  )
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
    `SELECT dish.category_id, category.category, dish.id, dish.name, dish.price FROM dish, category
  WHERE dish.category_id = category.id`
  )
    .then(function(data) {
      let categories = {};

      data.forEach(dish => {
        console.log(dish);
        let dishToSave = { dishId: dish.id, name: dish.name, price: dish.price }
        if (categories.hasOwnProperty(dish.category)) {
          categories[dish.category].dishes[dish.id] = dishToSave;
        } else {
          // let newCategoryToAdd = object.assign({
          //   categoryId: dish.category_id
          // });
          categories[dish.category] = {
            categoryId: dish.category_id,
            categoryName: dish.category,
            dishes: {[dish.id]: dishToSave}
          };
          // categories[dish.category] = [dish];
        }
      });
      console.log(categories);
      res.json(categories);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// post order
app.post("/api/transactions", (req, res) => {
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
            [item.menuItemId, orderId, item.quantity]
          );
        })
      ).then(() => orderId);
    })
    .then(orderId => res.json({ orderId: orderId }))
    .catch(error => res.json({ error: error.message }));
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
