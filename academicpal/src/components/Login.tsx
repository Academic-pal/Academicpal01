import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Ensure your firebase is correctly configured
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter"; // Typewriter effect package

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

  // Validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nmamit\.in$/;
    return emailRegex.test(email);
  };

  // Handle login with email and password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("please enter NMAMIT email");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "https://academicpal.vercel.app/"; // Redirect to external website after successful login
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("wrong-password") || error.message.includes("user-not-found")) {
          setError("Incorrect credentials. Please sign up if you don't have an account.");
        } else {
          setError(error.message); // Handle other login errors
        }
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Typewriter Effect */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">
          Welcome to{" "}
          <span className="text-yellow-400">
            <Typewriter
              words={["Academic Pal", "Your Learning Companion", "A Smarter Future"]}
              loop={0} // Infinite looping
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Sign in to explore personalized resources and tools for your academic journey.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="w-full sm:w-3/4 md:w-1/3 lg:w-1/4 flex flex-col gap-4">
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
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 rounded-lg text-base sm:text-lg md:text-xl font-semibold mt-4 w-full sm:w-auto hover:from-purple-400 hover:to-red-400 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>

      {/* Google login button */}
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:from-red-400 hover:to-yellow-400 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <FaGoogle className="text-xl sm:text-2xl" />
          <span className="text-base sm:text-lg font-semibold">Sign in with Google</span>
        </button>
      </div>

      {/* Switch to sign-up */}
      <div className="mt-4 text-center">
        <p className="text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
