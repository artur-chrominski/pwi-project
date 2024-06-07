import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = document.cookie.split(';').some((item) => item.trim().startsWith('cookies-accepted='));
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    document.cookie = "cookies-accepted=true; max-age=31536000; path=/";
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <p>Używamy plików cookie na stronie. Kliknięcie przycisku „Akceptuj wszystkie” oznacza zgodę na wykorzystywanie przez nas plików cookie.</p>
      <button onClick={handleAccept} className="bg-secondary text-white font-bold py-2 px-4 rounded">
        Akceptuj wszystkie
      </button>
    </div>
  );
};

export default CookieBanner;
