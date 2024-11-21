import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Ensure your firebase is correctly configured
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa"; // Add icons for the email and password fields
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user); // You can use user info here if needed
      window.location.href = "https://academicpal.vercel.app/"; // Redirect to your main website after Google login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Handle Google sign-in errors
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // Handle login with email and password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "https://academicpal.vercel.app/"; // Redirect to external website after successful login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Handle login errors
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleLogin} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 flex flex-col gap-4">
        {/* Email Input */}
        <div className="flex items-center bg-gray-800 p-3 rounded-md mb-4">
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

        {/* Password Input */}
        <div className="flex items-center bg-gray-800 p-3 rounded-md mb-4">
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

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="bg-white text-black p-3 rounded-md text-lg font-semibold mt-4 w-full hover:bg-yellow-400 transition duration-300"
        >
          Login
        </button>
      </form>

      {/* Google login button */}
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-md w-full sm:w-auto hover:bg-red-400 transition duration-300"
        >
          <FaGoogle className="text-lg" /> Sign in with Google
        </button>
      </div>

      {/* Switch to sign-up */}
      <div className="mt-4 text-center">
      <p className="text-white">
          Dont have account?{" "}
          <Link to="/signup" className="text-yellow-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
