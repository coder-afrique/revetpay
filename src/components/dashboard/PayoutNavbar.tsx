import React from 'react';
import { FaBell } from 'react-icons/fa';

const PayoutNavbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Payout</h2>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            GG
          </div>
          <span className="font-medium">Greg Graham</span>
        </div>
      </div>
    </div>
  );
};

export default PayoutNavbar;
