import React from "react";
import { useFormContext } from "react-hook-form";
import { DollarSign } from "lucide-react";

interface NumberInputProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  currency?: boolean;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  label,
  min,
  max,
  step = 1,
  required = false,
  disabled = false,
  currency = false,
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage = error?.message as string;

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {currency && (
          <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
        )}
        <input
          id={name}
          type="number"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`w-full px-4 ${
            currency ? "pl-9" : "pl-4"
          } py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
          }`}
          {...register(name, {
            valueAsNumber: true,
          })}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
