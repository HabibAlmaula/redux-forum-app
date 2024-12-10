import { useInput } from "@/hooks/useInput";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { login } from "@/routes/routeName";
import { useCallback } from "react";

const RegisterInput = ({ handleSubmit, isLoading }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToLogin = useCallback(() => {
    navigate(login);
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, email, password });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
            <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onPasswordChange}
              className="w-full px-4 py-3 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Create a password"
              required
            />
            <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={() => handleSubmit({ name, email, password })}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner className="-ml-1 mr-3 h-5 w-5" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </div>

      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <span className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer" onClick={handleNavigateToLogin}>
          Sign in
        </span>
      </p>
    </form>
  );
};

RegisterInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RegisterInput;
