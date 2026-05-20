import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "../redux/CartSlice";

function CartItem() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems
      .reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          <img
            src={item.image}
            alt={item.name}
            width="100"
          />

          <h3>{item.name}</h3>

          <p>Price: ${item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <p>
            Total Cost: $
            {(item.price * item.quantity).toFixed(2)}
          </p>

          <button onClick={() => handleIncrement(item)}>
            +
          </button>

          <button onClick={() => handleDecrement(item)}>
            -
          </button>

          <button onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total Amount: ${calculateTotalAmount()}</h3>
    </div>
  );
}

export default CartItem;
