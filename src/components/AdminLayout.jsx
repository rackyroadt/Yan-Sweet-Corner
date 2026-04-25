import { useAuth } from '../hooks/useAuth';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

export default function AdminLayout() {
  const { isLoggedIn, login, logout } = useAuth();

  if (!isLoggedIn) {
    return <Login onSuccess={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}
