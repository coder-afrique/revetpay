import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface WithdrawalPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}

const WithdrawalPinModal: React.FC<WithdrawalPinModalProps> = ({ isOpen, onClose, onSuccess, onFailure }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [pinValidation, setPinValidation] = useState<('idle' | 'error' | 'success')[]>(Array(6).fill('idle'));
  const [attempts, setAttempts] = useState(5);
  const correctPin = '000000'; // In a real app, this would be validated against a stored pin

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          onFailure();
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onFailure]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(parseInt(element.value)) && element.value !== '') return false;

    const newPin = [...pin];
    newPin[index] = element.value;
    setPin(newPin);
    setPinValidation(prev => prev.map((_, idx) => idx === index ? 'idle' : _));

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    } else if (element.previousSibling && element.value === '') {
      (element.previousSibling as HTMLInputElement).focus();
    }
  };

  const verifyPin = () => {
    const enteredPin = pin.join('');
    const isCorrect = enteredPin === correctPin;
    setPinValidation(pin.map(() => isCorrect ? 'success' : 'error'));

    if (isCorrect) {
      onSuccess();
    } else {
      setAttempts(prev => prev - 1);
      if (attempts === 1) {
        onFailure();
      } else {
        alert(`Incorrect PIN. You have ${attempts - 1} chances left.`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Enter Your PIN</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="flex justify-between mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              className={`w-12 h-12 border-2 rounded-lg text-center text-xl ${
                pinValidation[index] === 'error' ? 'border-red-500' :
                pinValidation[index] === 'success' ? 'border-green-500' :
                'border-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Time remaining: <span className="text-[#5E3EEB]">{timeLeft} seconds</span>
        </p>
        <button
          onClick={verifyPin}
          disabled={pin.some(digit => !digit)}
          className="w-full bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WithdrawalPinModal;
