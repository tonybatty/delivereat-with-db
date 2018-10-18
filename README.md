# Delivereat

In this project we will create a database backed version of Delivereat. We will build it as a new project, but feel free to use your original Delivereat project as reference. Be aware that because the data structures we will be working with here are likely to be different, it may not be possible to directly re-use your UI components.

A few notes before we get started

* Fork and clone this repo
* Start by building the simplest thing that works. Add to it as you go along. Test your application as frequently as possible to make sure it does what you expect
* Commit frequently and push to Github
* Implement features one at a time
* Make sure your app is responsive
* You may want to design the API first, before implementing the UI that uses and API

## Features

**Database and API**

* Design a database that will allow you to store a menu and orders. Start out with pen and paper first sketching out the tables and columns you will need, as well as the relationships between the tables.
* The database will need to store a menu which will contain item name and price. We will also need to store orders. Each order can have multiple menu items and each menu item can appear in multiple orders. Each menu item ordered will also need to have a quantity.
* Store the SQL commands used to create database and populate with initial data in a `database.sql` file in your repo. It will allow us to review your database code and also make it easy for you to rebuild database.
* Create a RESTful API that will allow you to get the menu and save new orders
* Test the API using Postman

**Menu**
* Design and build a front end UI that will load the menu from the API and display it to the user

**Order**

* Update the menu page to make it an order page
* It should allow the user to specify quantities of items to order
* It should add a delivery charge and display the total order cost
* Create functionality to submit orders to the API and display a notification to the user with order id

## Stretch goals

**Own feature**

* Design and implement a feature of your choosing

**SMS notification**

* Add a phone number input to your UI and a column in orders table to store it.
* Update the API to receive the phone number as part of the order
* Sign up for an account with Twilio. It's an API that allows you to send SMS messages and do lots of other cool things with phones. Use the signup code WELOVECODE to receive $20 credit.
* Implement SMS notification using Twilio to send an SMS notification to a user letting them know that the order has been received.

**Unit tests**

* Add unit tests to your application where appropriate

## Technical notes

* Run `npm install` after cloning to download all dependencies
* Use `npm run dev -- --watch` to build React
* You will need to create a `.env` file to store your database credentials. Make sure you add it to `.gitignore` file so that the credentials do not get commit to git and end up in public.
* Use `node server.js` to run the Node server in another tab
* Place all static files such as images and CSS in the `static` folder. When requesting those files from the server use `/static` at the beginning of the URL. For example `<link rel="stylesheet" type="text/css" href="/static/styles.css">`
* `bundle.js` produced by webpack will be output in the `static` folder
* To send data server using a POST, PUT or PATCH request you can do something the example below, where `order` is an object we want to send to the server and `http://localhost:8080/api/order` is URL we want to send it to.

```js
fetch('http://localhost:8080/api/order', {
    method: 'post',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    return response.json();
  }).then(data => {
    // handle response
  });
```

* Check out [Nodemon](https://nodemon.io/) to automatically rebuild and restart your server when changes are saved.

## README

* Produce a README.md which explains
  * what the project does
  * what technologies it uses
  * how to build it and run it
  * any unresolved issues the user should be aware of
