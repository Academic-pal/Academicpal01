import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Make sure your firebase is correctly configured
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaUser, FaRegIdCard, FaEnvelope, FaLock, FaRegPaperPlane } from "react-icons/fa"; // Icons for the fields
import { Link } from "react-router-dom"; // Import Link for navigation

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [usn, setUsn] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Google authentication function
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user); // You can use user info here, if needed
      window.location.href = "https://academicpal.vercel.app/";// Redirect after successful Google login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Handle Google sign-in errors properly
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // Sign up with email and password
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // You can save other details like name, usn, and section to Firebase Firestore or Realtime Database here.

      // Redirect to your website after successful sign-up
      window.location.href = "https://academicpal.vercel.app/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Display error if any occurs
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-6 sm:px-8 lg:px-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Sign Up</h1>
      <p className="text-lg mb-6 text-center text-gray-400">
        Create an account to get started with Academic Pal. Please fill in your details below.
      </p>
      <form onSubmit={handleSignUp} className="w-full max-w-md flex flex-col gap-6">
        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaUser className="text-white mr-3" />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaRegIdCard className="text-white mr-3" />
          <input
            type="text"
            placeholder="Enter your USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaRegPaperPlane className="text-white mr-3" />
          <input
            type="text"
            placeholder="Enter your section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaEnvelope className="text-white mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none"
            required
          />
        </div>

        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaLock className="text-white mr-3" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none"
            required
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="bg-white text-black p-3 rounded-md font-semibold mt-6 hover:bg-gray-200 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      {/* Google sign-up button */}
      <div className="mt-6">
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center gap-3 bg-gray-700 text-white py-3 px-6 rounded-md w-full sm:w-auto hover:bg-gray-600 transition duration-300"
        >
          <FaGoogle /> Sign Up with Google
        </button>
      </div>

      {/* Switch to login */}
      <div className="mt-6 text-center">
        <p className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
