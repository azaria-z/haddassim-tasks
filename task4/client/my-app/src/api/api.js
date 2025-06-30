



// ✅ api.js – קובץ עזר לכל הקריאות לשרת


import { fetchWithAuth } from '../authJWT';
export const API_BASE = 'http://localhost:5000';



// export const fetchUserInfo = async () => {
//   const res = await fetchWithAuth(`${API_BASE}/api/User/me`);
//   if (!res.ok) throw new Error('שגיאה בשליפת משתמש');
//   return await res.json();
// };



// export const login = async (email, password) => {
//   const res = await fetch(`${API_BASE}/api/Users/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   });
//   return await res.json();
// };
export const login = async (email, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/Users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Login error:', text);
      return null;
    }

    const data = await res.json();
    return data; // חשוב! תוציא רק את אובייקט המשתמש
  } catch (err) {
    console.error('שגיאה בבקשת login:', err);
    return null;
  }
};


//התחברות למערכת
export const register = async (userData) => {
  const res = await fetchWithAuth(`${API_BASE}/api/Users/Sign_up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return await res.json();
};

// החזרת ההזמנות מהשרת
export const fetchOrders = async () => {
  const res = await fetchWithAuth(`${API_BASE}/api/Order`);
  return await res.json();
};

// קבלת כל הספקים
export const fetchSuppliers = async () => {
  const res = await fetchWithAuth(`${API_BASE}/api/Supplier`);
  return await res.json();
};

//הוספת מוצר
export const addProduct = async (supplierId, product) => {
  const res = await fetchWithAuth(`${API_BASE}/api/Product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ supplierId, ...product })
  });
  return await res.json();
};

// הזמנות של ספק מסוים לפי supplierId
export const fetchSupplierOrders = async (supplierId) => {
  const url = new URL(`${API_BASE}/api/orders/Supplier/find`);
  url.searchParams.append('supplierId', supplierId);

  const res = await fetchWithAuth(url);
  return await res.json();
};

//שינוי מצב הסחורה
export const approveOrder = async (orderId,status) => {
  const res = await fetchWithAuth(`${API_BASE}/api/orders/status/'${status}'/order/'${orderId}`, {
    method: 'PUT'
  });
  return await res.json();
};

