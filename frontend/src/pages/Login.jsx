import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="h-20" />
          </div>

          <h1 className="text-3xl font-bold text-center">Welcome Back!!</h1>

          <p className="text-center text-gray-600">
            Please enter your credentials to log in.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <div className="text-right">
              <Link
                to="/password/forgot"
                className="text-sm text-black font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-white hover:text-black border-2 border-black transition"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            New to our platform?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image & Sign up Prompt */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center p-10 rounded-tl-[80px] rounded-bl-[80px] overflow-hidden">
        <div className="text-center space-y-6 max-h-[90vh] flex flex-col justify-center items-center">
          <img src={logo_with_title} alt="logo" className="h-40 mx-auto" />
          <p className="text-gray-300 text-lg">New to our platform? Sign up now.</p>
          <Link
            to="/register"
            className="px-8 py-2 bg-white text-black rounded-lg font-semibold border-2 border-white hover:bg-black hover:text-white transition duration-300"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
