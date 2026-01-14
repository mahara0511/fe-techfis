import React, { useState, useEffect } from 'react';
import './App.css';
import ExchangeRateViewer from './components/ExchangeRateViewer';
import RateHistory from './components/RateHistory';
import { ExchangeRate } from './types';

function App() {
  const [history, setHistory] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    // Load history from localStorage on mount
    const savedHistory = localStorage.getItem('exchangeRateHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSaveRate = (rate: ExchangeRate) => {
    const newHistory = [rate, ...history];
    setHistory(newHistory);
    localStorage.setItem('exchangeRateHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">Real-Time Exchange Rate Viewer</h1>
        <p className="app-subtitle">Japanese Yen (JPY) to Selected Currency</p>

        <ExchangeRateViewer onSaveRate={handleSaveRate} />

        <RateHistory history={history} />
      </div>
    </div>
  );
}

export default App;
