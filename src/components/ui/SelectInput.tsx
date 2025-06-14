import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  isClearable?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  searchable = false,
  className = "",
  isClearable = true,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    register(name);

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
  }, [register, name]);

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  const handleSelect = (option: SelectOption) => {
    setValue(name, option.value, { shouldValidate: true });
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, null, { shouldValidate: true });
  };

  const error = errors[name];
  const errorMessage = error?.message as string;

  return (
    <div className={`space-y-1 ${className}`} ref={containerRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-2 bg-white border rounded-lg text-left focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={!selectedOption ? "text-gray-400" : "text-gray-900"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center">
            {selectedOption && isClearable && (
              <button
                type="button"
                onClick={handleClear}
                className="mr-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown
              className={`text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              size={18}
            />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {searchable && (
                <div className="sticky top-0 p-2 bg-white border-b border-gray-100">
                  <div className="flex items-center px-3 py-2 border border-gray-200 rounded-lg">
                    <Search size={16} className="text-gray-400 mr-2" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-transparent border-none focus:outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="py-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`w-full flex items-center px-4 py-2 hover:bg-indigo-50 text-left ${
                        option.value === value
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-900"
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      <span className="flex-grow">{option.label}</span>
                      {option.value === value && (
                        <Check size={16} className="text-indigo-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No options found
                  </div>
                )}
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

export default SelectInput;
