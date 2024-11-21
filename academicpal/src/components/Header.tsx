import React from "react";
import logo from "../assets/academicpal.jpg"; // Adjust the path according to your folder structureacademicpal/src/assets/academicpal.jpg

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900">
      <div className="flex items-center">
        <img src={logo} alt="Academic Pal Logo" className="h-10 w-auto" />
        <h1 className="text-white text-3xl ml-4">Academic Pal</h1>
      </div>
    </header>
  );
};

export default Header;
