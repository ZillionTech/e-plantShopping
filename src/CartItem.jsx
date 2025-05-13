import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  function calculateTotalAmount(cart) {
    let total = 0;
    cart.forEach(item => {
        const cost = parseFloat(item.cost.substring(1));
        total += item.quantity * cost;
    });
    return total;
}

  cart.forEach(item => {
    const quantity = item.quantity;
    const cost = parseFloat(item.cost.toString().replace(/[^0-9.-]+/g, '')); // Safely remove $ or any symbol
    total += quantity * cost;
  });

  return total.toFixed(2); // Returns total as a string with 2 decimal places
};


  const handleContinueShopping = (e) => {
        e.preventDefault(); // Optional: Prevents any default form behavior if used in a form
        onContinueShopping(e); // Calls the parent function
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };
  

  const handleRemove = (item) => {
        dispatch(removeItem(itemName));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
    return (unitPrice * item.quantity).toFixed(2); // Multiply and format to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );

export default CartItem;


