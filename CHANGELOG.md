# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Removed - 2026-02-07
- **Home Assistant Integration**
  - Removed `HomeAssistantWidget` component
  - Removed Home Assistant API routes (`/api/homeassistant/status`)
  - Removed Home Assistant API client library (`lib/api/homeassistant.ts`)
  - Removed Home Assistant TypeScript types
  - Removed `HOMEASSISTANT_URL` and `HOMEASSISTANT_TOKEN` environment variables
  - Updated grid layout from 4-column to 3-column
  - Updated all documentation (README, DEPLOYMENT) to reflect 3-widget dashboard

### Current Features
- ✅ Todoist Tasks widget
- ✅ Google Calendar Events widget
- ✅ Weather widget (Christchurch, NZ)

## [0.1.0] - 2026-02-07

### Added
- Initial release with Next.js 15 and TypeScript
- Todoist integration (view and complete tasks)
- Google Calendar integration (upcoming events)
- Weather integration (current + 3-day forecast)
- ~~Home Assistant integration (cameras and alarm status)~~ [REMOVED]
- Responsive design (mobile, tablet, desktop)
- Auto-refresh functionality
- Dark mode support
- Comprehensive documentation
