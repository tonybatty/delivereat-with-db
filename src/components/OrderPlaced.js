import React from "react";
import "../styles/components/App.scss";

class OrderPlaced extends React.Component {
  constructor() {
    super();

    this.state = {
      order: {},
      dishes: {}
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (
      event.target.className == "checkout" ||
      event.target.className == "close"
    ) {
      this.props.closeCheckout();
    }
  }

  render() {
    return (
      <div className="checkout" onClick={event => this.handleClick(event)}>
        <div className="checkout__content">
          <span className="close">&times;</span>
          <h3 className="checkout-title">Order Placed!</h3>

          <h4 className="checkout-title">
            Your order Number is <b>{this.props.order.orderId}</b>
          </h4>

          {Object.keys(this.props.dishes).map(dishId => (
            <div className="basketItem" key={dishId}>
              <p className="basketItem__name">
                {this.props.order.dishes[dishId].quantity} x{" "}
                {this.props.order.dishes[dishId].name}
              </p>
              <p className="basketItem__price">
                £
                {(
                  this.props.dishes[dishId].price *
                  this.props.dishes[dishId].quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}

          <hr />

          <div className="basket__subtotal">
            <p>Subtotal</p>
            <p>£{this.props.order.subTotal.toFixed(2)}</p>
          </div>

          <div className="basket__delivery">
            <p>Delivery Fee</p>
            <p>£2.50</p>
          </div>

          <hr />

          <div className="basket__total">
            <h4>Total</h4>
            <p>£{(this.props.order.subTotal + 2.5).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderPlaced;
