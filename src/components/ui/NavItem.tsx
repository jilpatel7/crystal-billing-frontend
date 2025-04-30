import React from "react";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  collapsed?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  isActive = false,
  collapsed = false,
}) => {
  return (
    <a
      href="#"
      className={`
        group flex items-center ${
          collapsed ? "justify-center" : ""
        } px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out relative
        ${
          isActive
            ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
        }
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="ml-3">{title}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
          {title}
        </div>
      )}
    </a>
  );
};
