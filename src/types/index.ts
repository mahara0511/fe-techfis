export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: string;
  savedBy?: string;
}

export interface ApiResponse {
  success: boolean;
  rates: {
    [key: string]: number;
  };
}
