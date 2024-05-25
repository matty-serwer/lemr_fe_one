import { motion } from 'framer-motion';
import styles from './Loading.module.css';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const loadingCircleVariants = {
  start: { y: '0%' },
  end: { y: '100%' },
};

const loadingCircleTransition = {
  duration: 0.4,
  repeat: Infinity, // Repeat indefinitely
  repeatType: 'reverse' as const, // Reverse animation on repeat
  ease: 'easeInOut',
};

const Loading = () => {
  return (
    <motion.div
      className={styles.loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        className={styles.loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
};

export default Loading;