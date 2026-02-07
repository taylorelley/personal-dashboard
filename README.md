# Personal Dashboard

A modern, responsive personal dashboard built with Next.js 15 that integrates your essential services:

- 📝 **Todoist Tasks** - View and complete tasks from your "Shared 🤝" project
- 📅 **Google Calendar** - Upcoming events for the next 7 days
- 🌤️ **Weather** - Current weather and 3-day forecast for Christchurch, NZ

## Features

- ⚡ Built with Next.js 15 (App Router) and TypeScript
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔄 Real-time data refresh (auto-refresh every 30-60 seconds)
- 🌗 Dark mode support
- 🔒 Secure API proxying through Next.js API routes

## Prerequisites

- Node.js 20+
- Todoist API token
- Google Calendar OAuth refresh script

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/taylorelley/personal-dashboard.git
   cd personal-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment template and configure:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API credentials
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for required environment variables:

- `TODOIST_TOKEN` - Your Todoist API token
- `TODOIST_PROJECT_ID` - The Shared 🤝 project ID
- `GCAL_REFRESH_SCRIPT` - Path to Google Calendar refresh script

## Deployment

### Development Environment (Coolify)
- Auto-deploys from `dev` branch
- Configured in Coolify at https://coolify.taylorelley.com

### Production Environment (Coolify)
- Manual deploy from `main` branch
- Requires manual approval before deployment

## Project Structure

```
├── app/
│   ├── api/          # API routes (proxy layer)
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main dashboard page
├── components/
│   ├── widgets/      # Dashboard widgets (Todoist, Calendar, Weather)
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── lib/
│   └── api/          # API client libraries
└── types/            # TypeScript type definitions
```

## Development

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Start production**: `npm start`
- **Lint**: `npm run lint`

## License

Private project - All rights reserved
