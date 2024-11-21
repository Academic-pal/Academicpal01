import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login to Academic Pal</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 p-2 rounded hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 p-2 mt-4 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
