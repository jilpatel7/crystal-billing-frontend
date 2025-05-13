import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-gray-800/50 lg:hidden transition-opacity duration-300 ${
          !sidebarCollapsed
            ? "opacity-100 z-30"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      <div
        className={`fixed lg:relative z-40 ${
          sidebarCollapsed
            ? "-translate-x-full lg:translate-x-0"
            : "translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
