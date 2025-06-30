// App.js (דוגמה)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminOrders from './pages/AdminOrders/AdminOrders';
import AdminSuppliers from './pages/AdminSuppliers/AdminSuppliers';
import SupplierDashboard from './pages/SupplierDashboard/SupplierDashboard';
import SupplierAddProduct from './pages/SupplierAddProduct/SupplierAddProduct';
import SupplierOrders from './pages/SupplierOrders/SupplierOrders';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// ייתכן שנרצה להוסיף קונטקסט לאימות משתמש
import { AuthProvider, useAuth } from './context/AuthContext'; // נבנה בהמשך

// קומפוננטה עזר לניתוב מוגן
const PrivateRoute = ({ children, roles }) => {
    const { isAuthenticated, userRole, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // או ספינר טעינה
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/unauthorized" />; // דף גישה אסורה
    }

    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider> {/* עוטף את כל האפליקציה כדי לספק נתוני משתמש */}
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/" element={<Navigate to="/auth" />} /> {/* ניתוב ברירת מחדל */}

                    {/* ניתובים למנהל */}
                    <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
                    <Route path="/admin/orders" element={<PrivateRoute roles={['admin']}><AdminOrders /></PrivateRoute>} />
                    <Route path="/admin/suppliers" element={<PrivateRoute roles={['admin']}><AdminSuppliers /></PrivateRoute>} />

                    {/* ניתובים לספק */}
                    <Route path="/supplier" element={<PrivateRoute roles={['supplier']}><SupplierDashboard /></PrivateRoute>} />
                    <Route path="/supplier/add-product" element={<PrivateRoute roles={['supplier']}><SupplierAddProduct /></PrivateRoute>} />
                    <Route path="/supplier/orders" element={<PrivateRoute roles={['supplier']}><SupplierOrders /></PrivateRoute>} />

                    {/* דף 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;