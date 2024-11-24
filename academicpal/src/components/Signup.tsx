import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [usn, setUsn] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      window.location.href = "https://academicpal.vercel.app/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@nmamit\.in$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email ending with @nmamit.in");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "https://academicpal.vercel.app/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Typewriter Effect */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold">
          Join{" "}
          <span className="text-yellow-400">
            <Typewriter
              words={["Academic Pal", "Your Learning Companion", "A Smarter Future"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-400">
          Sign up to access personalized academic tools and resources.
        </p>
      </div>

      {/* Sign-Up Form */}
      <form onSubmit={handleSignUp} className="w-full sm:w-3/4 md:w-1/3 lg:w-1/4 flex flex-col gap-4">
        <label htmlFor="name" className="text-sm sm:text-base font-semibold">
          Full Name:
        </label>
        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaUser className="text-white mr-3" />
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* USN Input */}
        <label htmlFor="usn" className="text-sm sm:text-base font-semibold">
          USN:
        </label>
        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaUser className="text-white mr-3" />
          <input
            id="usn"
            type="text"
            placeholder="Enter your USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Email Input */}
        <label htmlFor="email" className="text-sm sm:text-base font-semibold">
          Email Address:
        </label>
        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaEnvelope className="text-white mr-3" />
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Password Input */}
        <label htmlFor="password" className="text-sm sm:text-base font-semibold">
          Password:
        </label>
        <div className="flex items-center bg-gray-800 p-3 rounded-md">
          <FaLock className="text-white mr-3" />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white border-none outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white p-3 rounded-lg text-sm sm:text-base font-semibold hover:from-green-300 hover:to-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-sm sm:text-base text-center">

         {/* Google Sign-Up Button */}
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:from-red-400 hover:to-yellow-400 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <FaGoogle className="text-xl sm:text-2xl" />
          <span>Sign Up with Google</span>
        </button>
      </div>

      {/* Switch to Login */}
      <div className="mt-4 text-center"></div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
