# Insight Board

Modern analytics dashboard built with Angular and TypeScript. This project is designed as a portfolio highlight focused on frontend quality, data visualization, and UX.

## Author
Felipe Torres

## Description
Insight Board is a responsive SaaS-style dashboard with a dark theme, bilingual interface (English/Spanish), KPI cards, interactive filters, charts, and reporting views powered by local mock data.

## Features
- KPI cards:
  - Total Sales
  - Active Users
  - Conversion Rate
  - Revenue Growth
- Data visualizations:
  - Monthly sales line chart
  - Revenue by category bar chart
  - User channel distribution doughnut chart
- Transactions table:
  - Columns: ID, client, category, amount, status, date
  - Visual status badges: Completed, Pending, Cancelled
- Filters:
  - Category
  - Status
  - Client search
  - Date range
- UI/UX:
  - Dark SaaS design
  - Sidebar navigation with routed sections
  - Rounded cards with spacing hierarchy
  - Fully responsive for desktop, tablet, and mobile
- Multi-view architecture:
  - Dashboard view (KPIs, charts, filters, transactions)
  - Analytics view (category and channel insights)
  - Reports view (monthly summary and CSV export)
  - Settings view (language preferences and locale preview)
- Internationalization:
  - English and Spanish support
  - Locale-aware date and currency formatting

## Tech Stack
- Angular (standalone components)
- TypeScript
- CSS (modern custom variables + responsive layout)
- Chart.js
- Local mock data

## Project Structure
```text
src/
  app/
    core/
      i18n.service.ts
    components/
      charts-panel/
      filter-bar/
      kpi-card/
      transactions-table/
    mock-data/
      dashboard.data.ts
    pages/
      dashboard-page/
      analytics-page/
      reports-page/
      settings-page/
    types/
      dashboard.types.ts
    app.ts
    app.html
    app.css
  styles.css
```

## Installation
```bash
npm install
```

## Run Locally
```bash
npm start
```

Open `http://localhost:4200/`.

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Future Improvements
- Add theme toggle (dark/light)
- Add pagination and sorting in transactions table
- Connect to real backend/API
- Export charts and table data (CSV/PDF)
- Add auth and role-based dashboard views

## Notes
This project is intentionally modular, with clear separation between UI components, mock data, and TypeScript interfaces to keep it scalable and easy to maintain.
