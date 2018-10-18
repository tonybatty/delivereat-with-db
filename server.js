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
app.get("/api/dishes", function(req, res) {
  db.any("SELECT * FROM dish")
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

// get transaction
app.get("/api/transactions", function(req, res) {
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
app.get("/api/transactions/:id", function(req, res) {
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
app.get("/api/dishes/:id", function(req, res) {
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

// post order
app.post("/api/transactions", (req, res) => {
  // 1. insert into "transaction" table
  db.one("INSERT INTO transaction (id, status) VALUES (DEFAULT, 'placed') RETURNING id")
    .then(result => {
      const transactionId = result.id;
      const { items } = req.body;

      // 2. insert into "dish_transaction" table
      return Promise.all(
        items.map(item => {
          return db.none(
            "INSERT INTO dish_transaction (dish_id, transaction_id, quantity) VALUES $1, $2, $3)",
            [item.dishItemId, transactionId, item.quantity]
          );
        })
      ).then(() => transactionId);
    })
    .then(() => res.json({ orderId: orderId }))
    .catch(error => res.json({ error: error.message }));
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
