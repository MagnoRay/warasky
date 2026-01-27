import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminGeneralLayout from '../layouts/AdminGeneralLayout';
import Products from '../pages/adminGeneral/Products';
import Login from '../pages/adminGeneral/Login';
import ProtectedRoute from './ProtectedRoute';
import ProductDetail from '../pages/adminGeneral/ProductDetail';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA LOGIN */}
        <Route path="/login" element={<Login />} />
        {/* ROOT */}
        <Route path="/" element={<Navigate to="/admin/products" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminGeneralLayout />}>
            <Route path="/admin/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
