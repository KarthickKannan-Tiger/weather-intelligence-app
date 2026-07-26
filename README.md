# Weather Intelligence Web Application

A modern, responsive Weather Intelligence web application built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Recharts**. The application leverages the free, public **Open-Meteo API** (no API key required) for geocoding and global weather forecasting.

---

## Features

- 🔍 **City Search & Geocoding**: Instant city lookup using the Open-Meteo Geocoding API with real-time debounced autocomplete and quick selection chips for popular world cities.
- 📍 **Geolocation Detection**: "Use My Location" option using HTML5 Geolocation API.
- 🌡️ **Current Weather Overview**: Displays temperature, "feels like" temperature, min/max for the day, weather condition description and dynamic icons, wind speed & direction, humidity, UV index, surface pressure, and sunrise/sunset times.
- ⚙️ **Customizable Units**: Toggle between Celsius (`°C`) and Fahrenheit (`°F`), as well as wind speed units (`km/h`, `mph`, `m/s`).
- ⏱️ **24-Hour Timeline**: Hourly forecast scroll slider with hourly temperatures, condition icons, and precipitation probability percentage.
- 📊 **Interactive Temperature Chart**: Visualized with Recharts featuring 7-day High/Low trends and 24-hour temperature curves with custom gradients and interactive tooltips.
- 📅 **7-Day Weather Forecast**: Individual daily forecast cards with relative temperature range bars, rain chance, wind speed, and clickable modal for detailed daily breakdowns.
- 💡 **Smart Activity Planner**: Intelligent activity recommendations for running, cycling, stargazing, outdoor dining, laundry drying, and travel based on live meteorological metrics.
- ⚠️ **Hazard Advisories**: Automatic weather hazard banners for extreme heat, freezing temperatures, high winds, heavy rain, or high UV radiation.
- ⭐️ **Local Persistence**: Save favorite cities and unit preferences in `localStorage`.
- 🛡️ **User-Friendly Error Handling**: Graceful error banners and fallbacks for invalid searches or network connectivity issues.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Weather API**: [Open-Meteo API](https://open-meteo.com/) (Free, no API key required)

---

## API Endpoints Used

1. **Open-Meteo Geocoding API**:
   `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=10&language=en&format=json`
2. **Open-Meteo Weather Forecast API**:
   `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&hourly=...&daily=...&timezone=auto`

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone or navigate to the repository directory**:
   ```bash
   cd weather-intelligence-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

---

## Production Build & Deployment

### Building for Production

To compile static production assets into the `dist/` folder:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment Instructions

#### 1. Vercel / Netlify / Cloudflare Pages
1. Push your repository to GitHub / GitLab.
2. Import the repository in your deployment platform (Vercel, Netlify, Cloudflare Pages).
3. Set the build command to `npm run build` and the output directory to `dist`.
4. No environment variables or API keys are needed!

#### 2. Static Web Hosting (GitHub Pages, S3, Firebase Hosting)
Deploy the contents of the generated `dist/` directory directly to any static file hosting server.

---

## License

Apache-2.0 License
