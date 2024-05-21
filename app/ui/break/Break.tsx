import React from "react";
import styles from "@/app/ui/break/Break.module.css";

interface BreakProps {
  size?: 'one' | 'two' | 'three';
}

const Break: React.FC<BreakProps> = ({ size = "one" }) => {
  return (
    <div className={`${styles[size]}`} />
  )
}

export default Break;