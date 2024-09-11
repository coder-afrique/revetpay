import React, { useState } from 'react';
import onboardingIllustration from '../../assets/onboarding-illustration.png';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    username: '',
    password: '',
    agreeTerms: false,
  });

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
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex h-screen bg-[#5E3EEB] text-white">
      {/* Illustration section - hidden on mobile, centered on larger screens */}
      <div className="hidden md:flex w-2/5 bg-[#5E3EEB] items-center justify-start pl-8">
        <div className="w-4/5 h-4/5 flex items-center justify-center">
          <img src={onboardingIllustration} alt="Onboarding Illustration" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* Sign-up form section - full width on mobile */}
      <div className="w-full md:w-3/5 bg-white text-gray-800 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-[#5E3EEB] text-left">Create Your Account</h1>
          <p className="text-gray-600 mb-6 text-left">Let's get you on board</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 text-left">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left"
                required
              />
            </div>

            <div>
              <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 text-left">Work Email</label>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5E3EEB] focus:border-[#5E3EEB] text-left"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-[#5E3EEB] focus:ring-[#5E3EEB] border-gray-300 rounded"
                required
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the Terms and Conditions
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5E3EEB] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E3EEB]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
