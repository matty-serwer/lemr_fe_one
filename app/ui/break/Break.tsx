import React from "react";
import styles from "@/app/ui/break/break.module.css";

interface BreakProps {
  size?: 'one' | 'two' | 'three';
}

const Break: React.FC<BreakProps> = ({ size = "one" }) => {
  return (
    <div className={`${styles[size]}`} />
  )
}

Break.defaultProps = {
  size: 'one'
}

export default Break;