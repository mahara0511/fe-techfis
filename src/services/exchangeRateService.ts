import axios from 'axios';

// Using a free exchange rate API
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${fromCurrency}`);

    if (
      response.data &&
      response.data.rates &&
      response.data.rates[toCurrency]
    ) {
      return response.data.rates[toCurrency];
    }

    throw new Error('Exchange rate not found');
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
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
