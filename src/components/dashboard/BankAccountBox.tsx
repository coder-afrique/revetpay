import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface BankAccountBoxProps {
  bank: {
    id: number;
    name: string;
    logo: string;
    accountNumber: string;
    accountName: string;
  };
  onRemove: (id: number) => void;
}

const BankAccountBox: React.FC<BankAccountBoxProps> = ({ bank, onRemove }) => {
  return (
    <div className="border-2 border-[#5E3EEB] rounded-lg p-4 w-full h-32 relative flex flex-col justify-between bg-[#5E3EEB] text-white">
      <div className="flex justify-between items-start">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img src={bank.logo} alt={bank.name} className="w-6 h-6" />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(bank.id);
          }} 
          className="text-white hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>
      <div>
        <p className="font-semibold">{bank.accountName}</p>
        <p className="text-sm">****{bank.accountNumber.slice(-4)}</p>
      </div>
    </div>
  );
};

export default BankAccountBox;
