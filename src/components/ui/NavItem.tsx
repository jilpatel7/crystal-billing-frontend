import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "./Tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  collapsed?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  to,
  collapsed = false,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const ref = useRef<HTMLAnchorElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Link
        to={to}
        ref={ref}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          group flex items-center ${collapsed ? "justify-center" : ""}
          px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out relative
          ${
            isActive
              ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          }
        `}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && <span className="ml-3">{title}</span>}
      </Link>

      {collapsed && showTooltip && <Tooltip targetRef={ref} content={title} />}
    </>
  );
};
