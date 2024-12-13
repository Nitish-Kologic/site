import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

export function PageContainer({ children, backgroundImage }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}