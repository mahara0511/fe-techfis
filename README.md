# Real-Time Exchange Rate Viewer with Shared History

A React + TypeScript web application that displays real-time exchange rates from Japanese Yen (JPY) to various target currencies.

## Features

✅ Real-time exchange rate display from JPY to:

- 🇵🇭 Philippines (PHP)
- 🇻🇳 Vietnam (VND)
- 🇮🇩 Indonesia (IDR)
- 🇺🇸 United States (USD)
- 🇨🇦 Canada (CAD)
- 🇸🇬 Singapore (SGD)

✅ Currency converter with live calculations

✅ Save current exchange rates to shared history

✅ Public history visible to all users

✅ Auto-refresh every 30 seconds

✅ Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
fe-techfis/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ExchangeRateViewer.tsx
│   │   ├── ExchangeRateViewer.css
│   │   ├── RateHistory.tsx
│   │   └── RateHistory.css
│   ├── services/
│   │   └── exchangeRateService.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API requests
- **Exchange Rate API** - Real-time currency data
- **CSS3** - Styling and animations

## API

This application uses the [Exchange Rate API](https://api.exchangerate-api.com/) to fetch real-time exchange rates.

## Notes

- Exchange rates are automatically refreshed every 30 seconds
- Saved rates are stored in browser localStorage
- History is shared across all users (in production, consider using a backend database)

## Contact

For questions or clarifications, please contact:

- Mr. Tay
- Mr. Yen
- Mr. Hien
