import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  mode: 'primary' | 'secondary' | 'light' | 'highlight' | 'warning';
  size?: 'large';
  link?: string;
  outline?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ mode, size, link, outline, shadow, children, onClick }) => {
  const buttonClass = `${styles.button} ${outline ? styles.outline : ''} ${styles[mode]} ${size === 'large' ? styles.large : ''} ${shadow ? styles.shadow : ''}`;

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