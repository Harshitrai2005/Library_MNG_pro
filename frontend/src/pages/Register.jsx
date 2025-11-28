import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register, resetAuthSlice } from "../store/slices/authSlice";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate(`/otp-verification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, email, navigate, dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side */}
      <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col items-center justify-center p-10 rounded-tr-[80px] rounded-br-[80px]">
        <img src={logo_with_title} alt="logo" className="h-40 mb-12" />
        <p className="text-gray-300 mb-6 text-center">
          Already have an account? Sign in now.
        </p>
        <Link
          to="/login"
          className="border-2 border-white text-white px-8 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          SIGN IN
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-10">
            <img src={logo} alt="logo" className="h-20 w-auto" />
            <h3 className="text-3xl font-bold">SIGN UP</h3>
          </div>

          <p className="text-center text-gray-600 mb-8">
            Please provide your information to sign up.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Mobile only sign in link */}
            <div className="md:hidden text-sm text-center mt-2">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  SIGN IN
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-white hover:text-black border-2 border-black transition duration-300"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
