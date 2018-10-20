import React from "react";
import BasketItem from "./BasketItem.js";
import "../styles/components/App.scss";

function Basket({
  basket,
  dishes,
  decreaseQuantity,
  increaseQuantity,
  checkout
}) {
  let subTotal = 0;

  Object.keys(basket).map(dishId => {
    subTotal += dishes[dishId].price * basket[dishId];
  });

  let deliveryFee = 2.5;

  let total = subTotal + deliveryFee;

  return (
    <div className="basket">
      <div className="basket-view">
        <a className="basket__expand__btn" href="#">
          View Basket
        </a>
      </div>

      <button
        className="basket__checkout-btn button"
        onClick={() => checkout()}
      >
        Checkout
      </button>

      <div className="basket-expanded">
        {Object.keys(basket).map(dishId => (
          <BasketItem
            key={dishId}
            dishName={dishes[dishId].name}
            dishId={dishId}
            quantity={basket[dishId]}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
          />
        ))}

        <hr />
        <div className="line" />

        <div className="basket__subtotal">
          <p>Subtotal</p>
          <p>£{subTotal.toFixed(2)}</p>
        </div>

        <div className="basket__delivery">
          <p>Delivery Fee</p>
          <p>£{deliveryFee.toFixed(2)}</p>
        </div>

        <hr />

        <div className="basket__total">
          <h4>Total</h4>
          <p>£{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Basket;
