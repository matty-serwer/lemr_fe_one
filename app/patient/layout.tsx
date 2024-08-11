
import React from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import styles from './Patient.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout;
