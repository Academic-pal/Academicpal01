import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/Signup"; // Import your SignUp component
import Login from "./components/Login";   // Import your Login component
import Header from "./components/Header"; // Import your Header component
import Footer from "./components/Footer"; // Import your Footer component
import PrivacyPolicy from "./components/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header /> {/* Header component included */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <Footer /> {/* Footer component included */}
      </div>
    </Router>
  );
};

export default App;
