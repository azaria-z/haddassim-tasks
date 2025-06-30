// ✅ OrdersList.jsx – רשימת הזמנות
import React, { useEffect, useState } from 'react';
import { fetchOrders, approveOrder } from '../api/api';

const OrdersList = ({ isAdmin, supplierId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const handleApprove = async (id) => {
    await approveOrder(id);
    const updated = await fetchOrders();
    setOrders(updated);
  };

  const filteredOrders = supplierId
    ? orders.filter(o => o.supplierId === supplierId)
    : orders;

  return (
    <div>
      <h3>רשימת הזמנות</h3>
      <ul>
        {filteredOrders.map(order => (
          <li key={order._id}>
            <p>מוצר: {order.product}</p>
            <p>סטטוס: {order.status}</p>
            {isAdmin || (order.status !== 'approved') ? (
              <button onClick={() => handleApprove(order._id)}>אשר הזמנה</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
