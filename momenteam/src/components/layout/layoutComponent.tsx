// src/components/Layout.tsx
import React from 'react';
import NavBar from '../navbar/navbarNewComponent.tsx';
import Footer from '../footer/footerComponent.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='mainLayout' style={{display: 'flex', flexDirection: 'column'}}>
      <NavBar />
      <main >{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
