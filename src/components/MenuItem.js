import React from "react";
import "../styles/components/App.scss";

function MenuItem({ dish, addToOrder }) {
  return (
    <div className="dish">
      <h4 className="dish__name">{dish.name}</h4>
      <h4 className="dish__price">£{dish.price}</h4>
      <button
        className="dish__btn button-quantity"
        onClick={() => addToOrder(dish.dishId)}>
        +
      </button>
    </div>
  );
}

export default MenuItem;
