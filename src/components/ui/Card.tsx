import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 ${className}`}>
      {children}
    </div>
  );
}