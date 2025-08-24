import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!form.email) newErrors.push("Email is required.");
    if (!form.password) newErrors.push("Password is required.");
    setErrors(newErrors);
    if (newErrors.length === 0) {
      // Submit logic here
       try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        })
        
        
        if(response.ok){
          navigate('/');
          console.log("User Logged In")
        } else {
          const data = await response.json()
          if (data.msg) {
            setErrors(data.msg);
          } else {
            setErrors(["An unknown error occurred."]);
          }
        } 
      } catch (err) {
        console.log("Error occured while reagistering.", err)
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] text-white font-['Inter']">
      <header className="relative z-10">
        <div className="main-content flex flex-col">
          <div className="glass-nav h-20 flex items-center justify-between px-6 rounded-xl m-4 shadow-lg backdrop-blur">
            <div className="flex justify-between items-center mb-2">
              <a href="/">
                <img
                className="invert w-25 h-8"
                src="/img/logo.svg"
                alt="Spotify Logo"
                />
              </a>
            </div>
            <a
              href="/"
              className="back-button text-white hover:text-gray-300 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 hover:shadow-lg group"
            >
              <span className="back-arrow inline-block">← Back to Home </span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="form-container rounded-2xl p-8 w-full max-w-md bg-[rgba(24,24,27,0.95)] backdrop-blur border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">Login to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-xl shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 mb-2">
                      Please fix the following errors:
                    </h3>
                    <ul className="text-sm text-red-700 space-y-1 list-none">
                      {errors.map((err, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{err}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block mb-2 text-white font-semibold text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="input-focus w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white bg-opacity-80 text-black"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-white font-semibold text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-focus w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white bg-opacity-80 text-black"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="text-sm text-white leading-relaxed">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full text-white font-semibold py-3 px-6 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-black hover:from-green-400"
              >
                Login
              </button>
            </div>

            {/* Link to sign up */}
            <p className="text-sm text-center text-gray-400 mt-6">
              Don't have an account?
              <a
                href="/sign-up"
                className="text-purple-600 hover:text-purple-800 hover:underline font-medium ml-1"
              >
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}