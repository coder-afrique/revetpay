import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import BankAccountBox from './BankAccountBox';

const mockBanks = [
  { id: 1, name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
  { id: 2, name: 'Chase', logo: 'https://logo.clearbit.com/chase.com' },
  { id: 3, name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
  { id: 4, name: 'Citibank', logo: 'https://logo.clearbit.com/citi.com' },
];

const Payout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bank' | 'crypto'>('bank');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [addedBanks, setAddedBanks] = useState<Array<{ id: number; name: string; logo: string; accountNumber: string; accountName: string }>>([]);

  const handleAddAccount = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
    setAccountNumber('');
    setAccountName('');
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(value);
    if (value.length === 10) {
      setAccountName('John Doe'); // Replace with a random name generator if needed
    } else {
      setAccountName('');
    }
  };

  const handleAddBank = () => {
    if (selectedBank && accountNumber && accountName) {
      const bank = mockBanks.find(b => b.id === selectedBank);
      if (bank) {
        const newBank = { ...bank, accountNumber, accountName, id: Date.now() };
        setAddedBanks(prevBanks => [...prevBanks, newBank]);
        handleCloseModal();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'bank' ? 'text-[#5E3EEB] font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('bank')}
          >
            Bank Account
          </button>
          <div className="border-r-2 border-[#5E3EEB] mx-4"></div>
          <button
            className={`px-4 py-2 ${activeTab === 'crypto' ? 'text-[#5E3EEB] font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('crypto')}
          >
            Crypto
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {addedBanks.map((bank) => (
            <BankAccountBox
              key={bank.id}
              bank={bank}
              onRemove={(id) => {
                setAddedBanks((prevBanks) => prevBanks.filter((b) => b.id !== id));
              }}
            />
          ))}
          <div className="border-2 border-dashed border-[#5E3EEB] rounded-lg p-8 flex justify-center items-center w-full h-32">
            <button className="text-[#5E3EEB] font-semibold" onClick={handleAddAccount}>
              + Add Account
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-left">Add Bank Account</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="bankSelect" className="block text-sm font-medium text-gray-700 mb-2 text-left">Select Bank</label>
              <select
                id="bankSelect"
                value={selectedBank || ''}
                onChange={(e) => setSelectedBank(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md text-left"
              >
                <option value="">Select a bank</option>
                {mockBanks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter 10-digit account number"
              />
            </div>
            {accountName && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <p className="text-gray-600">{accountName}</p>
              </div>
            )}
            <button
              className="w-full bg-[#5E3EEB] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
              onClick={handleAddBank}
              disabled={!selectedBank || accountNumber.length !== 10}
            >
              Add Bank
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payout;
