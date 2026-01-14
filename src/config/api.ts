export const API_CONFIG = {
  EXCHANGE_RATE: {
    API_KEY: process.env.REACT_APP_EXCHANGE_RATE_API_KEY || '',
    BASE_URL: 'https://v6.exchangerate-api.com/v6',
    get ENDPOINT() {
      return `${this.BASE_URL}/${this.API_KEY}/latest`;
    },
  },
  BACKEND: {
    // Mock backend API endpoint (giả lập)
    BASE_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',
    ENDPOINTS: {
      SAVE_RATE: '/rates/save',
      GET_HISTORY: '/rates/history',
    },
  },
};
