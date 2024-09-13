import React, { useState } from 'react';
import { FaUser, FaExchangeAlt, FaMoneyBillWave, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import AccountsNavbar from './AccountsNavbar';
import PayoutNavbar from './PayoutNavbar';  // Add this import
import AccountBalance from './AccountBalance';
import AssetsList from './AssetsList';
import Payout from './Payout';

const currencies = [
  { code: 'USD', symbol: '$', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'NGN', symbol: '₦', flag: 'https://flagcdn.com/w20/ng.png' },
  { code: 'GBP', symbol: '£', flag: 'https://flagcdn.com/w20/gb.png' },
];

const exchangeRates = {
  USD: 1,
  NGN: 460,
  GBP: 0.79,
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Accounts');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  // const navigate = useNavigate();

  const tabs = [
    { name: 'Accounts', icon: FaUser },
    { name: 'Transactions', icon: FaExchangeAlt },
    { name: 'Payout', icon: FaMoneyBillWave },
    { name: 'Settings', icon: FaCog },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <div className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'} h-screen fixed`}>
          <div className="p-4 flex items-center justify-between">
            {!isSidebarCollapsed && <h1 className="text-2xl font-bold text-[#5E3EEB]">Revetpay</h1>}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-500 hover:text-[#5E3EEB]"
            >
              {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
            </button>
          </div>
          <nav className="mt-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href="#"
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100`}
                onClick={() => setActiveTab(tab.name)}
              >
                <tab.icon className={`${activeTab === tab.name ? 'text-[#5E3EEB]' : ''} ${isSidebarCollapsed ? 'mr-0' : 'mr-3'}`} />
                {!isSidebarCollapsed && (
                  <span className={`${activeTab === tab.name ? 'text-[#5E3EEB]' : ''}`}>
                    {tab.name}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            {activeTab === 'Accounts' && <AccountsNavbar />}
            {activeTab === 'Payout' && <PayoutNavbar />}
            {/* Add other navbars for different tabs */}
          </div>
        </div>
        <div className="flex-1 p-4 md:p-6 bg-gray-100 overflow-y-auto">
          {activeTab === 'Accounts' && (
            <>
              <AccountBalance
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                exchangeRates={exchangeRates}
              />
              <div className="mt-6">
                <AssetsList
                  selectedCurrency={selectedCurrency}
                  exchangeRates={exchangeRates}
                />
              </div>
            </>
          )}
          {activeTab === 'Payout' && <Payout />}
          {/* Add other tabs content here */}
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center justify-center w-1/4 ${
                activeTab === tab.name ? 'text-[#5E3EEB]' : 'text-gray-500'
              }`}
            >
              <tab.icon className="text-2xl" />
              <span className="text-xs mt-1">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

