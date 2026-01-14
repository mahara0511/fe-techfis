import React, { useState, useEffect } from 'react';
import { Currency, ExchangeRate } from '../types';
import { fetchExchangeRate } from '../services/exchangeRateService';
import './ExchangeRateViewer.css';

interface Props {
  onSaveRate: (rate: ExchangeRate) => void;
}

const CURRENCIES: Currency[] = [
  { code: 'PHP', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VND', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'IDR', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'USD', name: 'United States', flag: '🇺🇸' },
  { code: 'CAD', name: 'Canada', flag: '🇨🇦' },
  { code: 'SGD', name: 'Singapore', flag: '🇸🇬' },
];

const ExchangeRateViewer: React.FC<Props> = ({ onSaveRate }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    CURRENCIES[0]
  );
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [amount, setAmount] = useState<string>('1');

  useEffect(() => {
    loadExchangeRate();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadExchangeRate, 30000);
    return () => clearInterval(interval);
  }, [selectedCurrency]);

  const loadExchangeRate = async () => {
    setLoading(true);
    setError('');
    try {
      const rate = await fetchExchangeRate('JPY', selectedCurrency.code);
      setExchangeRate(rate);
    } catch (err) {
      setError('Failed to fetch exchange rate. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRate = () => {
    if (exchangeRate) {
      const rateData: ExchangeRate = {
        id: Date.now().toString(),
        fromCurrency: 'JPY',
        toCurrency: selectedCurrency.code,
        rate: exchangeRate,
        timestamp: new Date().toISOString(),
      };
      onSaveRate(rateData);
      alert('Exchange rate saved successfully!');
    }
  };

  const calculateConversion = (): string => {
    if (!exchangeRate || !amount) return '0.00';
    const result = parseFloat(amount) * exchangeRate;
    return result.toFixed(2);
  };

  return (
    <div className="exchange-viewer">
      <div className="currency-selector">
        <label>Select Target Currency:</label>
        <div className="currency-grid">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              className={`currency-btn ${
                selectedCurrency.code === currency.code ? 'active' : ''
              }`}
              onClick={() => setSelectedCurrency(currency)}
            >
              <span className="flag">{currency.flag}</span>
              <span className="code">{currency.code}</span>
              <span className="name">{currency.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rate-display">
        {loading ? (
          <div className="loading">Loading exchange rate...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : exchangeRate ? (
          <>
            <div className="rate-info">
              <div className="rate-label">Current Exchange Rate</div>
              <div className="rate-value">
                1 JPY = {exchangeRate.toFixed(4)} {selectedCurrency.code}
              </div>
            </div>

            <div className="converter">
              <div className="input-group">
                <label>JPY Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="conversion-result">
                <span className="amount">{amount}</span> JPY =
                <span className="converted">
                  {' '}
                  {calculateConversion()} {selectedCurrency.code}
                </span>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveRate}>
              💾 Save Rate
            </button>
          </>
        ) : null}
      </div>

      <button
        className="refresh-btn"
        onClick={loadExchangeRate}
        disabled={loading}
      >
        🔄 Refresh Rate
      </button>
    </div>
  );
};

export default ExchangeRateViewer;
