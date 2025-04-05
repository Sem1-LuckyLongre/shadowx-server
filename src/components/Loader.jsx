export const Loader = ({ text = "Loading", showText = true }) => {
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
  ];

  return (
    <div className="flex flex-col items-center m-2 justify-center space-y-4">
      <div className="flex space-x-1">
        {colors.map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 ${color} rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
      {showText && (
        <div className="flex space-x-1">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="text-blue-500 font-medium text-lg animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
