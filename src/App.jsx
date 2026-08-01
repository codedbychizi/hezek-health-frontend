import { useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppFloatButton from './components/layout/WhatsAppFloatButton.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <AppRoutes />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-20">
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}