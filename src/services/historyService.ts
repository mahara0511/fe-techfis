import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { ExchangeRate } from '../types';

// Giả lập database trên client (mock server storage)
let mockDatabase: ExchangeRate[] = [];

// Khởi tạo mock data từ localStorage nếu có
const initMockDatabase = () => {
  const savedData = localStorage.getItem('sharedExchangeRateHistory');
  if (savedData) {
    mockDatabase = JSON.parse(savedData);
  }
};

// Lưu mock data vào localStorage (giả lập database persistence)
const saveMockDatabase = () => {
  localStorage.setItem(
    'sharedExchangeRateHistory',
    JSON.stringify(mockDatabase)
  );
};

initMockDatabase();

/**
 * API giả lập: Lưu rate mới
 * POST /api/rates/save
 */
export const saveExchangeRate = async (
  rate: ExchangeRate
): Promise<{ success: boolean; data: ExchangeRate }> => {
  try {
    // Giả lập API call với delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log('📤 API Call: POST /api/rates/save', rate);

    // Giả lập lưu vào database
    const savedRate = {
      ...rate,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    mockDatabase.unshift(savedRate);
    saveMockDatabase();

    console.log('✅ API Response: Rate saved successfully', savedRate);

    return {
      success: true,
      data: savedRate,
    };
  } catch (error) {
    console.error('❌ Error saving rate:', error);
    throw error;
  }
};

/**
 * API giả lập: Lấy lịch sử tất cả rates đã lưu (public shared history)
 * GET /api/rates/history
 */
export const getExchangeRateHistory = async (): Promise<{
  success: boolean;
  data: ExchangeRate[];
}> => {
  try {
    // Giả lập API call với delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log('📥 API Call: GET /api/rates/history');

    // Giả lập lấy data từ database
    const history = [...mockDatabase];

    console.log(
      `✅ API Response: Retrieved ${history.length} rates from history`
    );

    return {
      success: true,
      data: history,
    };
  } catch (error) {
    console.error('❌ Error fetching history:', error);
    throw error;
  }
};

/**
 * Uncomment code dưới đây khi có backend thật
 */

/*
// API thật với axios
export const saveExchangeRate = async (rate: ExchangeRate): Promise<{ success: boolean; data: ExchangeRate }> => {
  const response = await axios.post(
    `${API_CONFIG.BACKEND.BASE_URL}${API_CONFIG.BACKEND.ENDPOINTS.SAVE_RATE}`,
    rate
  );
  return response.data;
};

export const getExchangeRateHistory = async (): Promise<{ success: boolean; data: ExchangeRate[] }> => {
  const response = await axios.get(
    `${API_CONFIG.BACKEND.BASE_URL}${API_CONFIG.BACKEND.ENDPOINTS.GET_HISTORY}`
  );
  return response.data;
};
*/
