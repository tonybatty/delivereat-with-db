# DeliverEat

A database-backed restaurant menu order app.

[View live demo](https://takeawaymenu.herokuapp.com/)

![ScreenShot](/screenshots/deliverEatDesktopScreenshot.png)

## Technologies

- React
- SCSS
- Handlebars
- Node.js
- Express
- PostgreSQL
- webpack

## Installation

- Clone this repo.
- Run `npm install` to install dependencies.
- Create a `.env` file to store below config variables.

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

- Create a local PostgreSQL database and initialise it by running the query in `database.sql`.
- Run `npm start` to run the Node server with Nodemon.
- Run `npm run dev` to create a development build with webpack.
- Navigate to `localhost:8080` in your browser to view.

## Features

- A responsive web app which looks great on desktop, tablet and mobile screens.
- Food category sidebar which scrolls to each section when clicked.
- Sticky sidebars which stay on screen when scrolling through menu.
- Menu items can be added, removed and increase/decreased in quantity.
- Order checkout/confirmation modal with form input to capture user info.
