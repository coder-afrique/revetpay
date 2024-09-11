import React, { useState, useEffect } from 'react';
import onboardingIllustration from '../../assets/onboarding-illustration.png';

const EmailVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [otpValidation, setOtpValidation] = useState<('idle' | 'error' | 'success')[]>(Array(6).fill('idle'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [correctOtp, setCorrectOtp] = useState('000000'); // In a real app, this would be set by your backend

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(parseInt(element.value)) && element.value !== '') return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setOtpValidation(prev => prev.map((_, idx) => idx === index ? 'idle' : _));

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    } else if (element.previousSibling && element.value === '') {
      (element.previousSibling as HTMLInputElement).focus();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const verifyOtp = () => {
    setIsSubmitting(true);
    const enteredOtp = otp.join('');
    const isCorrect = enteredOtp === correctOtp;
    setOtpValidation(otp.map(digit => digit ? (isCorrect ? 'success' : 'error') : 'error'));
    if (isCorrect) {
      // Navigate to next page or perform next action
      console.log('OTP verified successfully');
    } else {
      console.log('Incorrect OTP');
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpValidation(Array(6).fill('idle'));
    setTimeLeft(600); // Reset timer to 10 minutes
    setCorrectOtp('000000'); // In a real app, you would generate a new OTP here
    console.log('OTP resent');
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
          <h1 className="text-2xl font-bold mb-2 text-[#5E3EEB] text-left">Email Verification</h1>
          <p className="text-gray-600 mb-6 text-left">Please enter the 6-digits sent to your Email</p>

          <div className="flex justify-between mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                className={`w-12 h-12 border-2 rounded-lg text-center text-xl ${
                  otpValidation[index] === 'error' ? 'border-red-500' :
                  otpValidation[index] === 'success' ? 'border-green-500' :
                  'border-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            OTP will expire in <span className="text-[#5E3EEB]">{formatTime(timeLeft)}</span>
          </p>

          <button
            onClick={verifyOtp}
            disabled={isSubmitting || otp.some(digit => !digit)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5E3EEB] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E3EEB] disabled:opacity-50"
          >
            Verify Email
          </button>

          <p className="mt-4 text-sm text-center">
            Didn't receive an OTP? <span className="text-[#5E3EEB] cursor-pointer" onClick={handleResend}>Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
