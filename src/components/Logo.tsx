import { forwardRef } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = forwardRef<SVGGElement, LogoProps>(
  ({ className = '', size = 'md' }, ref) => {
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32',
    };

    return (
      <div className={`${sizeClasses[size]} ${className} relative`}>
        {/* Orange floral mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 8-petal flower design */}
            <g ref={ref} className="flower-petals">
              <path d="M50 15 L55 35 L75 25 L60 40 L80 50 L60 60 L55 65 L50 85 L45 65 L40 60 L20 50 L40 40 L25 25 L45 35 Z" />
            </g>
          </svg>
        </div>
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-emerald-700 font-bold text-center leading-none">
            <div className="text-lg">Bloom</div>
            <div className="text-lg">Track</div>
          </div>
        </div>
      </div>
    );
  }
);

Logo.displayName = 'Logo';

export default Logo;
