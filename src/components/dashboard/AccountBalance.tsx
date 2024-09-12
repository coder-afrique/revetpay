import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import WithdrawalModal from './WithdrawalModal';

export interface AccountBalanceProps {
  currencies: Array<{ code: string; symbol: string; flag: string }>;
  selectedCurrency: { code: string; symbol: string; flag: string };
  setSelectedCurrency: React.Dispatch<React.SetStateAction<{ code: string; symbol: string; flag: string }>>;
  exchangeRates: Record<string, number>;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ currencies, selectedCurrency, setSelectedCurrency, exchangeRates }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const baseBalance = 10000; // Base balance in USD

  const convertedBalance = (baseBalance / exchangeRates[selectedCurrency.code]).toFixed(2);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>Total Balance</span>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md"
                >
                  <img src={selectedCurrency.flag} width="20" alt={`${selectedCurrency.code} flag`} />
                  <span>{selectedCurrency.code}</span>
                  {isDropdownOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100"
                      >
                        <img src={currency.flag} width="20" alt={`${currency.code} flag`} />
                        <span>{currency.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-3xl font-bold">{selectedCurrency.symbol}{convertedBalance}</div>
          </div>
          <button
            className="bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            Withdraw
          </button>
        </div>
      </div>
      <WithdrawalModal isOpen={isWithdrawalModalOpen} onClose={() => setIsWithdrawalModalOpen(false)} />
    </>
  );
};

export default AccountBalance;
