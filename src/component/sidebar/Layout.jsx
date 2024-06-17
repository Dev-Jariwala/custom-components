/* eslint-disable react/prop-types */
// src/components/Layout.js
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const tabs = [
    { link: "/", label: "Dashboard", icon: <TbLayoutDashboardFilled /> },
  ];
  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        tabs={tabs}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
