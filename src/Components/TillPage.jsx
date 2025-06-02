import React, { useState } from 'react';
import '../Styles/Till.css'; // Make sure the path is correct

const menuItems = [
  { id: 1, name: 'Burger', price: 45 },
  { id: 2, name: 'Chips', price: 25 },
  { id: 3, name: 'Soda', price: 15 },
  { id: 4, name: 'Coffee', price: 20 },
  { id: 5, name: 'Salad', price: 30 },
  { id: 6, name: 'Ice Cream', price: 18 },
];

export default function TillPage() {
  const [receiptItems, setReceiptItems] = useState([]);
  const [paymentType, setPaymentType] = useState('');

  const handleAddItem = (item) => {
    setReceiptItems([...receiptItems, item]);
  };

  const handleClear = () => {
    setReceiptItems([]);
    setPaymentType('');
  };

  const handlePayment = (type) => {
    setPaymentType(type);
  };

  const total = receiptItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="calculator-app-container">
      <h1 className="heading">Simple Till System</h1>

      <div className="till-container">
        {/* Receipt Section */}
        <div className="receipt">
          <h3>Receipt</h3>
          {receiptItems.length === 0 ? (
            <p className="no-items">No items added</p>
          ) : (
            <ul>
              {receiptItems.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <span>R{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="total">Total: R{total}</div>

          <div className="checkout-controls">
            <button
              className="checkout"
              onClick={() => alert(`Checked out with ${paymentType || 'no'} payment method.`)}
              disabled={receiptItems.length === 0}
            >
              Checkout
            </button>
            <button className="clear" onClick={handleClear}>
              Clear
            </button>
          </div>

          <div className="payment-options">
            <p>Select Payment:</p>
            <button className="payment" onClick={() => handlePayment('Cash')}>Cash</button>
            <button className="payment" onClick={() => handlePayment('Card')}>Card</button>
            <button className="payment" onClick={() => handlePayment('SnapScan')}>SnapScan</button>
          </div>
        </div>

        {/* Menu Section */}
        <div className="menu">
          <h3>Menu</h3>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="menu-button"
                onClick={() => handleAddItem(item)}
              >
                {item.name} - R{item.price}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
