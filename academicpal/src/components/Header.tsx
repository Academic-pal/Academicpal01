import React from "react";
import logo from "../assets/academicpal.jpg"; 

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black">
      <div className="flex items-center">
        <img src={logo} alt="Academic Pal Logo" className="h-10 w-auto" />
        <h1
          className="text-white text-3xl ml-4 font-serif font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Academic Pal
        </h1>
      </div>
    </header>
  );
};

export default Header;
