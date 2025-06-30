// ✅ SuppliersList.jsx – חיפוש ספקים ומוצרים
import React, { useEffect, useState } from 'react';
import { fetchSuppliers } from '../api/api';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    fetchSuppliers().then(setSuppliers);
  }, []);

  const filtered = suppliers.filter(s =>
    s.name.includes(searchName) &&
    s.products.some(p => p.name.includes(searchProduct))
  );

  return (
    <div>
      <h3>רשימת ספקים</h3>
      <input placeholder="חפש ספק" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
      <input placeholder="חפש מוצר" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
      <ul>
        {filtered.map(s => (
          <li key={s._id}>
            <p>{s.name}</p>
            <ul>
              {s.products.map(p => (
                <li key={p._id}>{p.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuppliersList;
