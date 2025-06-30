// ✅ SupplierDashboard.jsx – דשבורד לספק
import React, { useState } from 'react';
import AddProduct from './AddProduct';
import SupplierOrders from './SupplierOrders';

const SupplierDashboard = ({ user }) => {
  const [view, setView] = useState('orders');

  return (
    <div>
      <h2>שלום {user.name}, אתה מחובר כספק</h2>
      <div>
        <button onClick={() => setView('orders')}>הזמנות</button>
        <button onClick={() => setView('add')}>הוסף סחורה</button>
      </div>
      <hr />
      {view === 'orders' && <SupplierOrders supplierId={user._id} />}
      {view === 'add' && <AddProduct supplierId={user._id} />}
    </div>
  );
};

export default SupplierDashboard;
