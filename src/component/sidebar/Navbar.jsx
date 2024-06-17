/* eslint-disable react/prop-types */
// src/components/Navbar.js
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white h-16 flex items-center px-4">
      <button onClick={toggleSidebar} className="text-lg font-semibold">
        <AiOutlineMenu />
      </button>
    </div>
  );
};

export default Navbar;
