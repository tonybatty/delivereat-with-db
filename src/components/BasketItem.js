import React from "react";
import "../styles/components/basketItem.scss";

function BasketItem({ dishId, quantity, dishName, decreaseQuantity, increaseQuantity }) {
  return (
    <div className="basketItem">
      <div className="quantity">
        <button
          className="quantity__decrease button-quantity"
          onClick={() => decreaseQuantity(dishId)}
        >
          -
        </button>
        <p className="quantity__amount">{quantity}</p>
        <button
          className="quantity__increase button-quantity"
          onClick={() => increaseQuantity(dishId)}
        >
          +
        </button>
      </div>
      <p className="basketItem__name">{dishName}</p>

      <p className="basketItem__price" />
    </div>
  );
}

export default BasketItem;
