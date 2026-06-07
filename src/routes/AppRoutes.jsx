import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import Blind75Page from '../pages/Blind75Page';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/blind75" element={<Blind75Page />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
