// ✅ AddProduct.jsx – הוספת סחורה לספק
import React, { useState } from 'react';
import { addProduct } from '../api/api';

const AddProduct = ({ supplierId }) => {
  const [productName, setProductName] = useState('');

  const handleAdd = async () => {
    await addProduct(supplierId, { name: productName });
    alert("המוצר נוסף");
    setProductName('');
  };

  return (
    <div>
      <h3>הוספת מוצר</h3>
      <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="שם מוצר" />
      <button onClick={handleAdd}>הוסף</button>
    </div>
  );
};

export default AddProduct;