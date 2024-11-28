import React, { useState } from "react";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  
  const [name, setName] = useState<string>("");
  const [usn, setUsn] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  
  const navigate = useNavigate();

 
  const validateUsn = (usn: string): boolean =>
    /^NNM2[34][A-Z]{2}[0-9]{3}$/.test(usn);


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 

    
    if (!validateUsn(usn)) {
      setError("Invalid USN format. Please follow university guidelines.");
      return;
    }

    try {
      
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
    
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please provide a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="w-96 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Signup for Academic Pal</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
            required
          />

        
          <input
            type="text"
            placeholder="University USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
            required
          />

         
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
            required
          />

         
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 bg-gray-700 rounded text-white"
            required
          />

         
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 p-3 rounded font-bold"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
