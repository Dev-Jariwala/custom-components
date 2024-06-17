/* eslint-disable react/prop-types */
// src/components/Sidebar.js
import { FaHome } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, toggleSidebar, tabs = [] }) => {
  const sidebarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        window.innerWidth < 1024 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);
  return (
    <div
      className={`bg-gray-800 absolute lg:static text-white flex flex-col ${
        isOpen ? "w-64 " : "lg:w-20 w-0"
      } h-screen transition-width duration-300`}
      ref={sidebarRef}
    >
      <div
        className={`h-16 ${
          isOpen ? "flex" : "hidden lg:flex"
        } items-center justify-between px-5 bg-gray-900`}
      >
        <div
          className={`flex items-center animate-fade animate-duration-300 ${
            isOpen ? "justify-start space-x-5" : "justify-center"
          }`}
        >
          <span className="text-3xl">
            <MdOutlineRestaurantMenu />
          </span>
          <span
            className={`${
              isOpen ? "block" : "hidden"
            } text-2xl animate-fade animate-duration-300`}
          >
            Logo
          </span>
        </div>
        <div
          onClick={toggleSidebar}
          className={`${
            isOpen ? "block lg:hidden" : "hidden"
          } text-2xl cursor-pointer animate-fade animate-duration-400`}
        >
          <IoClose />
        </div>
      </div>
      <nav
        className={`${
          isOpen ? "flex" : "hidden lg:flex"
        } flex-col p-4 space-y-2`}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.link}
            to={tab.link}
            className="py-2 flex items-center justify-between px-3 cursor-pointer hover:bg-gray-700 rounded "
          >
            <div
              className={`flex items-center animate-fade animate-duration-300 ${
                isOpen ? "justify-start space-x-5" : "justify-center"
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span
                className={`${
                  isOpen ? "block" : "hidden"
                }  animate-fade animate-duration-300`}
              >
                {tab.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
