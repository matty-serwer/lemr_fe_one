import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  mode: 'primary' | 'secondary' | 'light' | 'highlight' | 'warning';
  size?: 'large';
  link?: string;
  children: React.ReactNode;
  onClick?: () => void; // Add this line
}

const Button: React.FC<ButtonProps> = ({ mode, size, link, children, onClick }) => {
  const buttonClass = `${styles.button} ${styles[mode]} ${size === 'large' ? styles.large : ''}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return link ? (
    <a href={link} className={buttonClass} onClick={handleClick}>
      {children}
    </a>
  ) : (
    <button className={buttonClass} onClick={handleClick}>{children}</button>
  );
};

export default Button;