import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
