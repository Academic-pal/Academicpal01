import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* MIT License Link */}
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-yellow-500"
          >
            MIT License
          </a>
          
          {/* Privacy Policy Link */}
          <a
            href="/privacy-policy" // Link to your privacy policy page
            className="text-sm hover:text-yellow-500"
          >
            Privacy Policy
          </a>

          {/* Designed and Developed by Hari */}
          <a
            href="https://hariharanath.is-cod.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-yellow-500"
          >
            Designed and Developed by Hari
          </a>
        </div>
        <p className="text-center text-sm mt-4">&copy; 2024 Academic Pal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
