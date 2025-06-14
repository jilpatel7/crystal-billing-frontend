import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { Calendar, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

interface DateTimeInputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  isClearable?: boolean;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  className = "",
  isClearable = true,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
    register,
  } = useFormContext();

  useEffect(() => {
    register(name);
  }, [register, name]);

  const value = watch(name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      if (value) {
        // Keep the time portion from the existing date
        const existingDate = new Date(value);
        date.setHours(existingDate.getHours());
        date.setMinutes(existingDate.getMinutes());
      }
      setValue(name, date, { shouldValidate: true });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    const [hours, minutes] = timeString.split(":").map(Number);

    const dateValue = value ? new Date(value) : new Date();
    dateValue.setHours(hours);
    dateValue.setMinutes(minutes);

    setValue(name, dateValue, { shouldValidate: true });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, null, { shouldValidate: true });
  };

  const error = errors[name];
  const errorMessage = error?.message as string;

  const formattedDateTime = value
    ? format(new Date(value), "MMM d, yyyy h:mm a")
    : "";

  const formattedTime = value ? format(new Date(value), "HH:mm") : "";

  return (
    <div className={`space-y-1 ${className}`} ref={containerRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          className={`w-full flex items-center px-4 py-2 bg-white border rounded-lg text-left focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <Calendar size={18} className="text-gray-400 mr-2" />
          <span className={!value ? "text-gray-400" : "text-gray-900"}>
            {formattedDateTime || "Select date and time"}
          </span>
          {value && isClearable && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            >
              <div className="space-y-4">
                <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={handleSelect}
                  className="bg-white"
                  classNames={{
                    day_selected:
                      "bg-indigo-600 text-white hover:bg-indigo-700",
                    day_today: "text-red-500",
                  }}
                />

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <Clock size={18} className="text-gray-400 mr-2" />
                    <label className="text-sm font-medium text-gray-700 mr-2">
                      Time:
                    </label>
                    <input
                      type="time"
                      value={formattedTime}
                      onChange={handleTimeChange}
                      className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DateTimeInput;
