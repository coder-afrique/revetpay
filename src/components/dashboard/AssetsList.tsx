import React from 'react';

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', quantity: '0.5', valueUSD: 15000 },
  { name: 'Ethereum', symbol: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', quantity: '2.3', valueUSD: 4600 },
  { name: 'Cardano', symbol: 'ADA', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png', quantity: '1000', valueUSD: 500 },
  { name: 'Polkadot', symbol: 'DOT', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png', quantity: '50', valueUSD: 750 },
  { name: 'Solana', symbol: 'SOL', logo: 'https://cryptologos.cc/logos/solana-sol-logo.png', quantity: '15', valueUSD: 1200 },
  { name: 'US Dollar', symbol: 'USD', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png', quantity: '5000', valueUSD: 5000 },
];

interface AssetsListProps {
  selectedCurrency: { code: string; symbol: string };
  exchangeRates: { [key: string]: number };
}

const AssetsList: React.FC<AssetsListProps> = ({ selectedCurrency, exchangeRates }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4 text-left">Assets</h2>
      <div className="space-y-4">
        {assets.map((asset, index) => {
          const convertedValue = (asset.valueUSD * exchangeRates[selectedCurrency.code]).toFixed(2);
          return (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={asset.logo} alt={asset.name} className="w-8 h-8" />
                <span>{asset.name} ({asset.symbol})</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{asset.quantity} {asset.symbol}</div>
                <div className="font-semibold">{selectedCurrency.symbol}{convertedValue}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetsList;
