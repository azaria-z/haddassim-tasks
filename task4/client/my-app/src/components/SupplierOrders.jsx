// ✅ SupplierOrders.jsx – צפייה ואישור הזמנות לספק
import React from 'react';
import OrdersList from './OrdersList';

const SupplierOrders = ({ supplierId }) => {
  return <OrdersList isAdmin={false} supplierId={supplierId} />;
};

export default SupplierOrders;
