'use client'

import marketData from '@/lib/market.json'

interface MarketItem {
  symbol: string
  change: string
}

const StockTicker = () => {
  // Directly use duplicated marketData for the seamless loop
  const duplicatedMarketData = [...marketData, ...marketData];

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-gray-950 text-cream flex items-center overflow-hidden z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {duplicatedMarketData.map((item, index) => (
          <span key={index} className="px-8 font-geist-mono text-mono-sm flex-shrink-0">
            {item.symbol}{' '}
            <span style={{ color: '#10B981' }} className="text-base font-bold">▲</span> {item.change}
          </span>
        ))}
        {/* Render a second set to ensure continuous loop */}
        {duplicatedMarketData.map((item, index) => (
          <span key={`second-${index}`} className="px-8 font-geist-mono text-mono-sm flex-shrink-0">
            {item.symbol}{' '}
            <span style={{ color: '#10B981' }} className="text-base font-bold">▲</span> {item.change}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;