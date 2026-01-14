import React, { useState, useEffect } from 'react';
import './App.css';
import ExchangeRateViewer from './components/ExchangeRateViewer';
import RateHistory from './components/RateHistory';
import { ExchangeRate } from './types';
import {
  saveExchangeRate,
  getExchangeRateHistory,
} from './services/historyService';

function App() {
  const [history, setHistory] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load history từ API khi app mount
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const response = await getExchangeRateHistory();
      if (response.success) {
        setHistory(response.data);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRate = async (rate: ExchangeRate) => {
    try {
      // Gọi API để lưu rate
      const response = await saveExchangeRate(rate);

      if (response.success) {
        // Sau khi save thành công, load lại history
        await loadHistory();
        alert('Exchange rate saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save rate:', error);
      alert('Failed to save rate. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">Real-Time Exchange Rate Viewer</h1>
        <p className="app-subtitle">Japanese Yen (JPY) to Selected Currency</p>

        <ExchangeRateViewer onSaveRate={handleSaveRate} />

        <RateHistory history={history} loading={loading} />
      </div>
    </div>
  );
}

export default App;
