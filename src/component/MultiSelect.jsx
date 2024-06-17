/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaChevronDown, FaTimesCircle } from "react-icons/fa";

const MultiSelect = ({ options, preSelected }) => {
  const [selectedOptions, setSelectedOptions] = useState(preSelected || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
    setSearchTerm("");
    searchRef.current.focus();
  };

  const handleClear = () => {
    setSelectedOptions([]);
    searchRef.current.focus();
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
    searchRef.current.focus();
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.includes(option)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setIsDropdownOpen(true);
    searchRef.current.focus();
  };

  return (
    <div className="relative w-full max-w-lg" ref={dropdownRef}>
      <div
        className={`flex items-center border rounded p-2 ${
          isFocused ? "border-blue-500 ring ring-blue-200" : "border-gray-300"
        }`}
        onClick={handleFocus}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFocus();
        }}
      >
        <div className="flex flex-wrap items-center flex-grow">
          {selectedOptions.map((option, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white flex items-center justify-between px-2 py-1 rounded-full text-sm mr-1 mb-1"
            >
              {option}
              <button
                className="ml-1 text-white hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option);
                }}
              >
                <FaTimes />
              </button>
            </span>
          ))}
          <div className="flex-grow">
            <input
              className="p-1.5 outline-none border-none text-sm w-4"
              value={searchTerm}
              ref={searchRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const inputValue = e.target.value.trim();
                  if (inputValue && !selectedOptions.includes(inputValue)) {
                    handleOptionToggle(inputValue);
                    setSearchTerm("");
                  }
                }
              }}
              placeholder={selectedOptions.length === 0 ? "Search..." : ""}
            />
          </div>
        </div>
        {selectedOptions.length > 0 && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            <FaTimesCircle />
          </button>
        )}
        <button
          className="ml-2 text-gray-500 hover:text-gray-700 border-l-2 border-gray-200 pl-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <FaChevronDown />
        </button>
      </div>
      {isDropdownOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded max-h-60 overflow-y-auto mt-1 z-10">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedOptions.includes(option) ? "bg-gray-300" : ""
              }`}
              onClick={() => handleOptionToggle(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
