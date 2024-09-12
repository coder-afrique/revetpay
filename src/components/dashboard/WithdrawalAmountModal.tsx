import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import WithdrawalPinModal from './WithdrawalPinModal';

interface WithdrawalAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteWithdrawal: () => void;
  selectedMethod: 'bank' | 'crypto';
}

const WithdrawalAmountModal: React.FC<WithdrawalAmountModalProps> = ({ isOpen, onClose, onCompleteWithdrawal, selectedMethod }) => {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const bankAccounts = [
    { id: '1', name: 'Bank of America - Checking ****1234' },
    { id: '2', name: 'Chase - Savings ****5678' },
    { id: '3', name: 'Wells Fargo - Checking ****9012' },
  ];

  const handleContinue = () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    setShowSuccessModal(true);
  };

  const handlePinFailure = () => {
    setShowPinModal(false);
    onClose();
  };

  if (!isOpen) return null;

  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Withdrawal Successful</h2>
          <p className="text-gray-600 mb-4">Your withdrawal has been processed successfully.</p>
          <button
            className="w-full bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            onClick={onCompleteWithdrawal}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Enter Withdraw Amount</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          {selectedMethod === 'bank' && (
            <div className="mb-4">
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a bank account</option>
                {bankAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            className="w-full bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
      <WithdrawalPinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
        onFailure={handlePinFailure}
      />
    </>
  );
};

export default WithdrawalAmountModal;
