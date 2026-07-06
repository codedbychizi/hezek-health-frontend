import { useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppFloatButton from './components/layout/WhatsAppFloatButton.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  const location = useLocation();
  // Admin routes use their own layout (AdminLayout with sidebar).
  // Public routes use the standard Header / Footer / WhatsApp wrapper.
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <AppRoutes />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}