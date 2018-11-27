import React from "react";
import OrderPlaced from "./orderPlaced.js";
import "../styles/components/Checkout.scss";

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      orderPlaced: false,
      order: {},
      dishes: {}
    };

    this.handleClick = this.handleClick.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  getTotals() {
    let subTotal = 0;
    const deliveryFee = 2.5;

    Object.keys(this.props.basket).map(dishId => {
      subTotal += this.props.dishes[dishId].price * this.props.basket[dishId];
    });

    return {
      subTotal: subTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: (subTotal + deliveryFee).toFixed(2)
    };
  }

  handleClick(event) {
    if (
      event.target.className == "checkout" ||
      event.target.className == "close"
    ) {
      this.props.closeCheckout();
    }
  }

  placeOrder() {
    console.log("place order")
    const basket = this.props.basket;
    const basketCheckout = {
      items: Object.keys(basket).map(dishId => {
        return { dishId: dishId, quantity: basket[dishId] };
      })
    };

    // fetch("api/transaction", {
    //   method: "post",
    //   body: JSON.stringify(basketCheckout),
    //   headers: {
    //     "content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("order post success: ", JSON.stringify(data));
    //     console.log("order id: " + data.orderId);
    //     this.setState({
    //       order: data,
    //       dishes: data.dishes
    //     });
    //   })
    //   .catch(error => console.error("Error: ", error));
  }

  render() {
    if (this.state.order.orderId !== undefined) {
      console.log("order placed");

      return (
        <OrderPlaced order={this.state.order} dishes={this.state.dishes} />
      );
    }

    return (
      <div className="checkout" onClick={event => this.handleClick(event)}>
        <div className="checkout__content">
          <span className="close">&times;</span>
          <h3 className="checkout-title">Your Order</h3>

          {Object.keys(this.props.basket).map(dishId => (
            <div className="basketItem" key={dishId}>
              <p className="basketItem__name">
                {this.props.basket[dishId]} x {this.props.dishes[dishId].name}
              </p>
              <p className="basketItem__price">
                £
                {(
                  this.props.dishes[dishId].price * this.props.basket[dishId]
                ).toFixed(2)}
              </p>
            </div>
          ))}

          <hr />

          <div className="basket__subtotal">
            <p>Subtotal</p>
            <p>£{this.getTotals().subTotal}</p>
          </div>

          <div className="basket__delivery">
            <p>Delivery Fee</p>
            <p>£{this.getTotals().deliveryFee}</p>
          </div>

          <hr />

          <div className="basket__total">
            <h4>Total</h4>
            <p>£{this.getTotals().total}</p>
          </div>

          <form>
            <ul className="form">
              <li>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
              </li>
              <li>
                <label htmlFor="name">Email</label>
                <input type="email" id="email" />
              </li>
              <li>
                <label htmlFor="mobile">Mobile</label>
                <input type="tel" id="mobile" />
              </li>
              <li>
                <label htmlFor="message">Delivery Instructions</label>
                <textarea rows="4" id="message" />
              </li>
              <li>
                <button
                  className="checkout__checkout-btn button"
                  onClick={() => this.placeOrder()}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
