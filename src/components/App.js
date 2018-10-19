import React from "react";
import Menu from "./Menu.js";
import Basket from "./Basket.js";

import "../styles/components/App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dishes: {},
      categories: {},
      basket: {}
    };

    this.addToOrder = this.addToOrder.bind(this);
  }

  componentDidMount() {
    fetch("api/dish")
      .then(response => response.json())
      .then(result => this.setState({ dishes: result }))
      .catch(error => console.error("Error: ", error));

    fetch("api/category")
      .then(response => response.json())
      .then(result => this.setState({ categories: result }))
      .catch(error => console.error("Error ", error));
  }

  addToOrder(dishId) {
    let updatedBasket = Object.assign({}, this.state.basket);

    if (this.state.basket.hasOwnProperty(dishId)) {
      updatedBasket[dishId]++;
    } else if (!this.state.basket.hasOwnProperty(dishId)){
      updatedBasket = Object.assign({}, this.state.basket, {
        [dishId]: 1
      });
    }
    this.setState({ basket: updatedBasket });
  }

  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="header__container">
            <img
              className="header__container__image"
              src="../static/images/header.jpg"
            />
            <h1 className="header-title">
              Tony's Steak House <hr />
            </h1>
          </div>
        </header>

        <main className="main">
          <aside className="main__aside-left">
            <div className="sticky">
              <h3 className="category-title">Categories</h3>
              <nav className="categories">
                {Object.keys(this.state.categories).map((category) => (
                  <a
                    className="categories__category"
                    key={category}
                    href={`#category${this.state.categories[category].categoryId}`}
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="main__article">
            {Object.values(this.state.categories).map((category, index) => (
              <Menu
                key={category.categoryId}
                dishes={category.dishes}
                category={category.categoryName}
                index={category.categoryId}
                addToOrder={this.addToOrder}
              />
            ))}
          </article>

          <aside className="main__aside-right">
            <div className="sticky-basket">
              <Basket
                basket={this.state.basket}
                dishes={this.state.dishes}
                decreaseQuantity={this.decreaseQuantity}
                increaseQuantity={this.increaseQuantity}
                checkout={this.checkout}
              />
            </div>
          </aside>
        </main>

        <footer className="footer" />
      </div>
    );
  }
}

export default App;
