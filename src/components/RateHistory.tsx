import React from 'react';
import { ExchangeRate } from '../types';
import './RateHistory.css';

interface Props {
  history: ExchangeRate[];
  loading?: boolean;
}

const RateHistory: React.FC<Props> = ({ history, loading = false }) => {
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCurrencyFlag = (code: string): string => {
    const flags: { [key: string]: string } = {
      PHP: '🇵🇭',
      VND: '🇻🇳',
      IDR: '🇮🇩',
      USD: '🇺🇸',
      CAD: '🇨🇦',
      SGD: '🇸🇬',
    };
    return flags[code] || '🏳️';
  };

  return (
    <div className="rate-history">
      <h2 className="history-title">📊 Shared Rate History</h2>
      <p className="history-subtitle">
        Public history of all saved exchange rates, visible to everyone
      </p>

      {loading ? (
        <div className="empty-state">
          <div className="loading-spinner">⏳</div>
          <p>Loading history...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No saved rates yet. Save your first rate above!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((rate) => (
            <div key={rate.id} className="history-item">
              <div className="history-main">
                <div className="currency-pair">
                  <span className="flag">
                    {getCurrencyFlag(rate.toCurrency)}
                  </span>
                  <span className="pair-text">
                    {rate.fromCurrency} → {rate.toCurrency}
                  </span>
                </div>
                <div className="rate-amount">{rate.rate.toFixed(4)}</div>
              </div>
              <div className="history-meta">
                <span className="timestamp">
                  ⏰ {formatDate(rate.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateHistory;
