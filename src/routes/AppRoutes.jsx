import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import Blind75Page from '../pages/Blind75Page';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/blind75" element={<Blind75Page />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
