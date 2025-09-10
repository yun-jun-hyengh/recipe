import React from 'react';
//import MainLayout from './layouts/MainLayout';
//import Home from './pages/Home';

import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import HeaderBottom from './components/HeaderBottom';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Header />}
      {!isAdminPage && <HeaderBottom />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
