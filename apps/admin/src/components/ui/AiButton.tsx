'use client';

import type React from 'react';
import styles from './AiButton.module.css';

interface AiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  url?: string;
}

export function AiButton({
  children,
  className = '',
  url,
  ...props
}: AiButtonProps) {
  return (
    <button
      className={`${url ? styles['shiny-cta-link'] : styles['shiny-cta']} ${styles.group} ${className}`}
      {...props}
    >
      <span className={`flex items-center ${styles['button-span']}`}>
        {children}
      </span>
    </button>
  );
}
