import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';
import { useInput } from '@/hooks/useInput';
import { useNavigate } from 'react-router';
import { register } from '@/routes/routeName';

const LoginInput = ({ onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter your email"
              onChange={onEmailChange}
              required
              disabled={isLoading}
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={onPasswordChange}
              disabled={isLoading}
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
      <button
        type="submit"
        onClick={() => onSubmit({ email, password })}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <LoadingSpinner className="-ml-1 mr-3 h-5 w-5" />
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-gray-600 mt-4">
        Don&apos;t have an account?{' '}
        <span
          className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
          onClick={() => navigate(register)}
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

LoginInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginInput;
