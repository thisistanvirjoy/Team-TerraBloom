import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-emerald-100 bg-white shadow-sm p-4 ${className} transition-transform duration-200 will-change-transform hover:-translate-y-0.5`}
    >
      {children}
    </div>
  );
}
