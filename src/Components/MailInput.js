import React, { useState } from 'react';
import '../Components/MailInput.css';

const providers = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'aol.com',
  'hotmail.com',
  'msn.com',
  'icloud.com'
];

function MailInput() {
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.includes('@')) {
      const inputParts = inputValue.split('@');
      const domain = inputParts[1].trim().toLowerCase();

      const filteredProviders = providers.filter((provider) =>
        provider.startsWith(domain) && provider !== domain
      );

      setSuggestions(filteredProviders);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const inputParts = value.split('@');
    const updatedValue = inputParts[0] + '@' + suggestion;
    setValue(updatedValue);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="mail-input-container">
      <label htmlFor="mail-input">Email:</label>
      <div className="input-wrapper">
        <input
          type="email"
          id="mail-input"
          name="email"
          value={value}
          onChange={handleInputChange}
          className="mail-input"
        />
        {showDropdown && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MailInput;
