import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    // Check if API key is loaded
    if (!API_CONFIG.EXCHANGE_RATE.API_KEY) {
      console.error('API Key is missing! Please check your .env file');
      throw new Error('API Key not configured');
    }

    const url = `${API_CONFIG.EXCHANGE_RATE.ENDPOINT}/${fromCurrency}`;
    console.log('Fetching exchange rate from:', url);

    const response = await axios.get(url);

    if (
      response.data &&
      response.data.result === 'success' &&
      response.data.conversion_rates &&
      response.data.conversion_rates[toCurrency]
    ) {
      return response.data.conversion_rates[toCurrency];
    }

    throw new Error('Exchange rate not found');
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
    }
    throw error;
  }
};

// Alternative: Mock data for development/testing
export const fetchExchangeRateMock = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock exchange rates from JPY
  const mockRates: { [key: string]: number } = {
    PHP: 0.38,
    VND: 168.5,
    IDR: 107.2,
    USD: 0.0067,
    CAD: 0.0095,
    SGD: 0.009,
  };

  return mockRates[toCurrency] || 1;
};
