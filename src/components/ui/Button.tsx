import { Loader2 } from "lucide-react";
import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  disabled,
  type = "button",
  isLoading = false,
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
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case "sm":
        return "px-2.5 py-1 text-xs";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  const baseClasses =
    "font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  const disabledClasses =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${getVariantClasses()} ${disabledClasses} ${getSizeClasses()} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
