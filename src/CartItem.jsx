import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            const cost = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
            total += item.quantity * cost;
        });
        return total.toFixed(2);
    };

    const calculateTotalCost = (item) => {
        const unitPrice = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
        return (unitPrice * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ 
            name: item.name, 
            quantity: item.quantity + 1 
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ 
                name: item.name, 
                quantity: item.quantity - 1 
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img 
                            className="cart-item-image" 
                            src={item.image} 
                            alt={item.name} 
                        />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-quantity">
                                <button 
                                    className="cart-item-button dec" 
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    className="cart-item-button inc" 
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>
                            <button 
                                className="cart-item-delete" 
                                onClick={() => handleRemove(item)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-actions">
                <button 
                    className="continue-shopping"
                    onClick={onContinueShopping}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default CartItem;