// ✅ AdminDashboard.jsx – דשבורד למנהל
import React, { useState } from 'react';
import OrdersList from './OrdersList';
import SuppliersList from './SuppliersList';

const AdminDashboard = ({ user }) => {
  const [view, setView] = useState('orders');

  return (
    <div>
      <h2>שלום {user.name}, אתה מחובר כמנהל</h2>
      <div>
        <button onClick={() => setView('orders')}>הזמנות</button>
        <button onClick={() => setView('suppliers')}>ספקים</button>
      </div>
      <hr />
      {view === 'orders' && <OrdersList isAdmin={true} />}
      {view === 'suppliers' && <SuppliersList />}
    </div>
  );
};

export default AdminDashboard;
