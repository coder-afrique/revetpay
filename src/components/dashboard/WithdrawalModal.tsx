import React, { useState } from 'react';
import { FaTimes, FaUniversity, FaBitcoin } from 'react-icons/fa';
import WithdrawalAmountModal from './WithdrawalAmountModal';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'crypto' | null>(null);
  const [showAmountModal, setShowAmountModal] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedMethod) {
      setShowAmountModal(true);
    }
  };

  const handleCompleteWithdrawal = () => {
    setShowAmountModal(false);
    setSelectedMethod(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Choose withdrawal method</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 p-4 border rounded-lg flex flex-col items-center ${
                selectedMethod === 'bank' ? 'border-[#5E3EEB]' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('bank')}
            >
              <FaUniversity className="text-3xl mb-2" />
              <span>Bank Account</span>
            </button>
            <button
              className={`flex-1 p-4 border rounded-lg flex flex-col items-center ${
                selectedMethod === 'crypto' ? 'border-[#5E3EEB]' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod('crypto')}
            >
              <FaBitcoin className="text-3xl mb-2" />
              <span>Crypto Account</span>
            </button>
          </div>
          <button
            className="w-full bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            onClick={handleContinue}
            disabled={!selectedMethod}
          >
            Continue
          </button>
        </div>
      </div>
      {showAmountModal && selectedMethod && (
        <WithdrawalAmountModal
          isOpen={showAmountModal}
          onClose={() => setShowAmountModal(false)}
          onCompleteWithdrawal={handleCompleteWithdrawal}
          selectedMethod={selectedMethod}
        />
      )}
    </>
  );
};

export default WithdrawalModal;
