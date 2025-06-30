// ✅ auth.js – ניהול טוקן גישה בלבד (ה-Refresh נשמר ב-cookie HttpOnly)

// שמירה של access token בלבד
export const saveAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
};

// fetch עם access token
export const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include' // כדי לשלוח את עוגיית ה-Refresh Token
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return fetchWithAuth(url, options); // נסה שוב
    } else {
      clearTokens();
      window.location.reload(); // מפנה למסך התחברות
    }
  }

  return response;
};

// בקשה לריענון access token
const refreshAccessToken = async () => {
  const res = await fetch('http://localhost:5000/api/refresh-token', {
    method: 'GET',
    credentials: 'include' // שולח את העוגיה HttpOnly עם הבקשה
  });

  if (res.ok) {
    const data = await res.json();
    saveAccessToken(data.accessToken);
    return true;
  }

  return false;
};


































// // ✅ auth.js – ניהול טוקן גישה ורענון
// export const saveTokens = ({ accessToken, refreshToken }) => {
//   localStorage.setItem('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);
// };

// export const getAccessToken = () => localStorage.getItem('accessToken');
// export const getRefreshToken = () => localStorage.getItem('refreshToken');
// export const clearTokens = () => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
// };

// export const fetchWithAuth = async (url, options = {}) => {
//   const token = getAccessToken();
//   const headers = {
//     ...options.headers,
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   if (response.status === 401) {
//     const refreshed = await refreshAccessToken();
//     if (refreshed) {
//       return fetchWithAuth(url, options); // נסה שוב
//     } else {
//       clearTokens();
//       window.location.reload();
//     }
//   }

//   return response;
// };

// const refreshAccessToken = async () => {
//   const refreshToken = getRefreshToken();
//   const res = await fetch('http://localhost:5000/api/refresh', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token: refreshToken })
//   });

//   if (res.ok) {
//     const data = await res.json();
//     saveTokens(data);
//     return true;
//   } else {
//     return false;
//   }
// };