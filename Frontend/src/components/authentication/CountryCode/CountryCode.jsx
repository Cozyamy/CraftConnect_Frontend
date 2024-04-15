import React, { useState } from 'react';

function CountryCodeSelector({ onSelect }) {
  const [countryCode, setCountryCode] = useState('+1'); // Default country code

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    onSelect(e.target.value); // Pass the selected country code to the parent component
  };

  return (
    <select value={countryCode} onChange={handleCountryCodeChange}>
      <option value="+1">+234 (Nig)</option>
      <option value="+44">+1 (USA)</option>
      <option value="+44">+44 (UK)</option>
      {/* Add more country codes as needed */}
    </select>
  );
}

export default CountryCodeSelector;
