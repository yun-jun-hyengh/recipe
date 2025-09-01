import React from 'react';
//import MainLayout from './layouts/MainLayout';
//import Home from './pages/Home';

import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';
import HeaderBottom from './components/HeaderBottom';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderBottom />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
