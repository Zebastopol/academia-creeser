import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!isHome && <Footer />}
    </>
  );
};

export default MainLayout;
