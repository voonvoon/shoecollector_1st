"use client";

import { FormEvent, useState } from "react";
//FormEvent is generic type represents any event that occurs in a form element (like submit, input, or change events).
//provide type safety by letting TS know that e is specifically a form-related event.
//import toast from "react-hot-toast"; //npm i react-hot-toast --legacy-peer-deps -- try this cuz tis npm not ready for react19 yet!
import { useRouter } from "next/navigation";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();//useRouter, you can perform actions like navigating to different routes

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //e: FormEvent<HTMLFormElement>, you're telling TypeScript:
    //"This event handler is handling a form event, specifically on an HTML form element."
    e.preventDefault(); // so page doesn't reload
    try {
      setLoading(true);
      //console.log(name, email,password);
      const response = await fetch(`${process.env.API}/user-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        //use JSON.stringify else error cuz sending obj:
        //1.Converts Object to JSON String, cuz APIs expect that when receiving data.
        //before ={ name: "John", email: "john@example.com", password: "securePassword" }
        //after ={"name":"John","email":"john@example.com","password":"securePassword"}
      });

      const data = await response.json();

      if (!response.ok) {
        //toast.error(data.error);
        setLoading(false);
      } else {
        //toast.success(data.success);
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter your name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter your password"
          />

          <button
            className="cursor-pointer w-full h-12 flex items-center justify-center bg-gray-700 text-white rounded-full py-3 px-6 shadow-md hover:bg-gray-600 transition duration-300 mt-6"
            disabled={loading || !name || !email || !password}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
