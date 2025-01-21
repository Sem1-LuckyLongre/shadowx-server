import React, { useState } from 'react';

const Loader = ({ 
  type = 'default', 
  color = 'blue', 
  size = 'medium',
  fullScreen = false 
}) => {
  // Color Variants
  const colorVariants = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    indigo: 'text-indigo-500'
  };

  // Size Variants
  const sizeVariants = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  // Loader Types
  const loaderTypes = {
    // Spinner Loader
    default: () => (
      <div 
        className={`
          ${sizeVariants[size]}
          ${colorVariants[color]}
          border-4
          border-current
          border-t-transparent
          rounded-full
          animate-spin
        `}
      />
    ),

    // Pulse Loader
    pulse: () => (
      <div className="flex space-x-2">
        {[1, 2, 3].map((dot) => (
          <div 
            key={dot}
            className={`
              ${sizeVariants[size]} 
              ${colorVariants[color]} 
              rounded-full 
              animate-pulse
            `}
            style={{
              animationDelay: `${dot * 0.2}s`
            }}
          />
        ))}
      </div>
    ),

    // Bouncing Dots Loader
    dots: () => (
      <div className="flex space-x-2">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`
              ${sizeVariants[size]} 
              ${colorVariants[color]} 
              rounded-full 
              animate-bounce
            `}
            style={{
              animationDelay: `${dot * 0.1}s`
            }}
          />
        ))}
      </div>
    ),

    // Circular Loader
    circular: () => (
      <div 
        className={`
          ${sizeVariants[size]} 
          ${colorVariants[color]} 
          rounded-full 
          relative 
          animate-ping
        `}
      >
        <div 
          className={`
            absolute 
            inset-0 
            ${colorVariants[color]} 
            rounded-full 
            animate-pulse 
            opacity-75
          `}
        />
      </div>
    ),

    // Wave Loader
    wave: () => (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`
              ${sizeVariants[size]} 
              ${colorVariants[color]} 
              rounded-full 
              animate-[wave_1.5s_infinite_ease-in-out]
            `}
            style={{
              animationDelay: `${dot * 0.1}s`,
              transformOrigin: 'center bottom'
            }}
          />
        ))}
      </div>
    ),

    // Full Screen Loader
    fullScreen: () => (
      <div 
        className="
          fixed 
          inset-0 
          z-50 
          flex 
          flex-col 
          items-center 
          justify-center 
          bg-white dark:bg-gray-900
          bg-opacity-70 dark:bg-opacity-70
          backdrop-blur-md
        "
      >
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`
              ${sizeVariants['xlarge']} 
              ${colorVariants[color]} 
              border-4 
              border-current 
              border-t-transparent 
              rounded-full 
              animate-spin
            `}
          />
          <p 
            className={`
              text-lg 
              font-medium 
              ${colorVariants[color]} 
              animate-pulse
            `}
          >
            Loading...
          </p>
        </div>
      </div>
    )
  };

  // Render Loader
  if (fullScreen) {
    return loaderTypes.fullScreen();
  }

  return (
    <div 
      className="
        flex 
        justify-center 
        items-center 
        w-full 
        min-h-[100px]
      "
    >
      {loaderTypes[type]()}
    </div>
  );
};

// Loader Showcase Component
const LoaderShowcase = () => {
  const [currentType, setCurrentType] = useState('default');
  const [currentColor, setCurrentColor] = useState('blue');

  const loaderTypes = [
    'default', 
    'pulse', 
    'dots', 
    'circular', 
    'wave'
  ];

  const colors = [
    'blue', 
    'green', 
    'red', 
    'purple', 
    'indigo'
  ];

  return (
    <div 
      className="
        min-h-screen 
        bg-[rgb(var(--background))]
        dark:bg-gradient-to-br 
        dark:from-gray-900 
        dark:to-gray-800 
        flex 
        flex-col 
        items-center 
        justify-center 
        p-6
      "
    >
      <div 
        className="
          bg-white 
          dark:bg-gray-800 
          rounded-2xl 
          shadow-2xl 
          border
          border-gray-200
          dark:border-gray-700
          p-8 
          w-full 
          max-w-2xl 
          space-y-6
        "
      >
        <h1 
          className="
            text-3xl 
            font-bold 
            text-center 
            text-gray-900 dark:text-white
          "
        >
          Loader Showcase
        </h1>

        {/* Loader Type Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {loaderTypes.map((type) => (
            <button
              key={type}
              onClick={() => setCurrentType(type)}
              className={`
                px-4 
                py-2 
                rounded-full 
                capitalize
                transition-all 
                ${
                  currentType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'
                }
              `}
            >
              {type} Loader
            </button>
          ))}
        </div>

        {/* Color Selector */}
        <div className="flex justify-center gap-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`
                w-10 
                h-10 
                rounded-full 
                ${`bg-${color}-500`}
                transform 
                ${
                  currentColor === color
                    ? 'scale-110 border-4 border-white shadow-lg'
                    : 'hover:scale-105'
                }
                transition-all
              `}
            />
          ))}
        </div>

        {/* Loader Display */}
        <div 
          className="
            flex 
            justify-center 
            items-center 
            min-h-[200px] 
            bg-gray-100 
            dark:bg-gray-800
            rounded-lg
          "
        >
          <Loader 
            type={currentType} 
            color={currentColor} 
            size="large"
          />
        </div>

        {/* Full Screen Loader Demo */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              // Simulate full screen loader
              <Loader fullScreen />;
            }}
            className="
              bg-blue-500 
              text-white 
              px-6 
              py-3 
              rounded-full 
              hover:bg-blue-600 
              transition-colors
            "
          >
            Show Full Screen Loader
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoaderShowcase;