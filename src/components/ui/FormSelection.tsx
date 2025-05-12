import React, { ReactNode } from "react";
import { ClipboardList, Diamond, MapPin, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  icon?: "clipboard" | "gem" | string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "clipboard":
        return <ClipboardList size={24} className="text-indigo-600" />;
      case "gem":
        return <Diamond size={24} className="text-indigo-600" />;
      case "user":
        return <UserPlus size={24} className="text-indigo-600" />;
      case "map":
        return <MapPin size={24} className="text-indigo-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-indigo-100">
      <div className="flex items-center mb-6">
        {icon && (
          <div className="mr-3 bg-indigo-100 rounded-lg p-2">{getIcon()}</div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FormSection;
