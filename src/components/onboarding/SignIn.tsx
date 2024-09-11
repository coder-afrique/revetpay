import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import onboardingIllustration from '../../assets/onboarding-illustration.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend for authentication
  };

  return (
    <div className="flex h-screen bg-[#5E3EEB] text-white">
      <div className="hidden md:flex w-2/5 bg-[#5E3EEB] items-center justify-start pl-8">
        <div className="w-4/5 h-4/5 flex items-center justify-center">
          <img src={onboardingIllustration} alt="Onboarding Illustration" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <div className="w-full md:w-3/5 bg-white text-gray-800 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-[#5E3EEB] text-left">Glad to have you back!</h1>
          <p className="text-gray-600 mb-6 text-left">Fill in your details to sign in</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 text-left">Username or Email Address</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#5E3EEB] focus:ring-[#5E3EEB] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#5E3EEB] hover:text-opacity-80">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5E3EEB] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E3EEB]"
              >
                Sign In
              </button>
            </div>
            <p className="mt-4 text-sm text-center">
              Don't have an account? <span className="text-[#5E3EEB] cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
