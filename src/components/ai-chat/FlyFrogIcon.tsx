import React from 'react';

interface FlyFrogIconProps {
  className?: string;
}

export const FlyFrogIcon: React.FC<FlyFrogIconProps> = ({ className }) => (
  <div className="relative" style={{ transform: 'translateY(-10%)' }}>
    <img 
      src="/lovable-uploads/556278f4-55ec-4741-a12d-d996da94b6be.png" 
      alt="JFrog Logo" 
      className={className || "w-14 h-14"} // Use provided className or default
    />
  </div>
);
