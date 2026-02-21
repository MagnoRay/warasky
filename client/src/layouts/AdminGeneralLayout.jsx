import { Outlet } from 'react-router-dom';
import React, { useState } from "react";
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import styles from './AdminGeneralLayout.module.css';
import CartButton from '../components/common/CartButton';
import HeroSlider from '../components/marketing/HeroSlider'

export default function AdminGeneralLayout({children}) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">     
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} />
      {children}
      <CartButton cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <HeroSlider />

      <div className={styles.layout}>
        
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
