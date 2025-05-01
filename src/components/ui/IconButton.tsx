import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = "ghost",
  size = "sm",
  children,
  className = "",
  ...props
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "outline":
        return "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700";
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900";
      default:
        return "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900";
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "p-1";
      case "md":
        return "p-2";
      case "lg":
        return "p-3";
      default:
        return "p-1";
    }
  };

  const baseClasses =
    "rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  return (
    <button
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
