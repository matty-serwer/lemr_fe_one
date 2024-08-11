
import React from 'react';
import styles from './AlertCard.module.css';

interface AlertCardProps {
  message: string;
}

const AlertCard = ({ message }: AlertCardProps) => {
  return (
    <div className={styles.alertContainer}>
      <div className={styles.alertCard}>
          <h2 className={styles.message}>{message}</h2>
        </div>
    </div>
  );
};

export default AlertCard;
