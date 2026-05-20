import { useState } from 'react';

function CartItem() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Aloe Vera',
      price: 10,
      quantity: 1,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Snake Plant',
      price: 15,
      quantity: 2,
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>Total Amount: ${totalAmount}</h2>

      {cartItems.map(item => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />

          <h3>{item.name}</h3>

          <p>Unit Price: ${item.price}</p>

          <p>Total Cost: ${item.price * item.quantity}</p>

          <button onClick={() => increaseQuantity(item.id)}>
            +
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => decreaseQuantity(item.id)}>
            -
          </button>

          <button onClick={() => removeItem(item.id)}>
            Delete
          </button>
        </div>
      ))}

      <button onClick={() => alert('Coming Soon')}>
        Checkout
      </button>

      <button onClick={() => window.location.href = '/products'}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
