import React from 'react';
import styles from "./Footer.module.css";

interface FooterProps {
}

const Footer: React.FC<FooterProps> = ({}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerText}>
        &copy; {currentYear} LEMR
      </p>
    </div>
  );
};

export default Footer;
