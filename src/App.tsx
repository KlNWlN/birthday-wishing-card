import React, { useState, useEffect } from 'react';
import { BirthdayCardData, DEFAULT_CARD_DATA } from './types/card';
import { decodeCardData, getEncodedDataFromUrl } from './utils/urlData';
import { CustomizationPortal } from './components/CustomizationPortal';
import { WishExperience } from './components/WishExperience';

export const App: React.FC = () => {
  const [view, setView] = useState<'portal' | 'wish'>('portal');
  const [cardData, setCardData] = useState<BirthdayCardData>(DEFAULT_CARD_DATA);

  // Parse URL on initial load and on hash change
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      const encodedData = getEncodedDataFromUrl();
      if (encodedData) {
        const decoded = decodeCardData(encodedData);
        if (decoded) {
          setCardData(decoded);
          setView('wish');
          return;
        }
      }

      // Check if path or hash specifies wish view
      if (pathname.includes('/wish') || hash.includes('/wish')) {
        setView('wish');
      } else {
        setView('portal');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);

    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const handlePreview = (customizedData: BirthdayCardData) => {
    setCardData(customizedData);
    setView('wish');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStudio = () => {
    setView('portal');
    // Update hash to root
    if (window.location.hash.includes('wish')) {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-[100dvh] w-full font-sans antialiased text-stone-800 bg-cream-100">
      {view === 'portal' ? (
        <CustomizationPortal
          initialData={cardData}
          onPreview={handlePreview}
        />
      ) : (
        <WishExperience
          cardData={cardData}
          onBackToStudio={handleBackToStudio}
        />
      )}
    </div>
  );
};

export default App;
