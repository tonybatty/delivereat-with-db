import React from "react";
import MenuItem from "./MenuItem";
import "../styles/components/App.scss";

function Menu({ dishes, category, addToOrder, index }) {
  return (
    <div className="dishes">
      <h3 className="dishes__category" id={`category${index}`}>{category}</h3>
      {Object.values(dishes).map(dish => (
        <MenuItem key={dish.dishId} dish={dish} addToOrder={addToOrder} />
      ))}
      <hr />
    </div>
  );
}

export default Menu;
