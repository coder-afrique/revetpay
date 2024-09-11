import React, { useState } from 'react';
import { FaUser, FaExchangeAlt, FaMoneyBillWave, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Accounts');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { name: 'Accounts', icon: FaUser },
    { name: 'Transactions', icon: FaExchangeAlt },
    { name: 'Payout', icon: FaMoneyBillWave },
    { name: 'Settings', icon: FaCog },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
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
              className={`flex items-center px-6 py-3 text-gray-700 ${
                activeTab === tab.name ? 'bg-[#5E3EEB] bg-opacity-10 text-[#5E3EEB]' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon className={`${activeTab === tab.name ? 'text-[#5E3EEB]' : ''} ${isSidebarCollapsed ? 'mr-0' : 'mr-3'}`} />
              {!isSidebarCollapsed && tab.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-4">{activeTab}</h2>
        {/* Add content for each tab here */}
      </div>
    </div>
  );
};

export default Dashboard;
