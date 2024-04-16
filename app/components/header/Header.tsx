import React from 'react';
import styles from "./Header.module.css";

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.logo}>lemr</h1>
    </div>
  );
};

export default Header;