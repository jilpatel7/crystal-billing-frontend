import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  LogOut,
  HelpCircle,
  ListOrderedIcon,
} from "lucide-react";
import { NavItem } from "../components/ui/NavItem";

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      className={`${
        collapsed ? "w-16 lg:w-20" : "w-64"
      } bg-white border-r border-gray-200 h-screen flex flex-col`}
    >
      <div
        className={`flex items-center justify-center h-16 border-b border-gray-200 flex-shrink-0 ${
          collapsed ? "px-2" : "px-6"
        }`}
      >
        {collapsed ? (
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Divya Lacer
            </span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <nav className="py-4">
          <div className="px-2 space-y-1">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              title="Dashboard"
              isActive={true}
              collapsed={collapsed}
            />
            <NavItem
              icon={<Users size={20} />}
              title="Users"
              collapsed={collapsed}
            />
            <NavItem
              icon={<ShoppingCart size={20} />}
              title="Products"
              collapsed={collapsed}
            />
            <NavItem
              icon={<BarChart2 size={20} />}
              title="Analytics"
              collapsed={collapsed}
            />
          </div>

          <div className="mt-10">
            <h6
              className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                collapsed ? "sr-only" : ""
              }`}
            >
              Orders
            </h6>
            <div className="mt-2 px-2 space-y-1">
              <NavItem
                icon={<ListOrderedIcon size={20} />}
                title="View Orders"
                collapsed={collapsed}
              />
              <NavItem
                icon={<ListOrderedIcon size={20} />}
                title="Create Order"
                collapsed={collapsed}
              />
            </div>
          </div>

          <div className="mt-10">
            <h6
              className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                collapsed ? "sr-only" : ""
              }`}
            >
              Settings
            </h6>
            <div className="mt-2 px-2 space-y-1">
              <NavItem
                icon={<Settings size={20} />}
                title="Settings"
                collapsed={collapsed}
              />
              <NavItem
                icon={<HelpCircle size={20} />}
                title="Help"
                collapsed={collapsed}
              />
            </div>
          </div>
        </nav>
      </div>

      <div className="p-2 border-t border-gray-200 flex-shrink-0">
        <NavItem
          icon={<LogOut size={20} />}
          title="Logout"
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
};
