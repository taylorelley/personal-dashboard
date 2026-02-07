# Google Calendar OAuth Setup

The improved Calendar API (`lib/api/calendar-improved.ts`) handles OAuth token refresh internally without requiring an external script. This makes it work seamlessly in Docker containers.

## Getting the Required Tokens

### Option 1: Extract from Existing Setup

If you already have `~/.clawdbot/secrets/gcal_tokens.json`, extract the refresh token:

```bash
cat ~/.clawdbot/secrets/gcal_tokens.json | jq -r '.refresh_token'
```

Then set these environment variables in Coolify:
```
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>
GOOGLE_REFRESH_TOKEN=<refresh_token_from_above>
```

### Option 2: Create New OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project** (or create a new one)
3. **Enable the Calendar API**:
   - APIs & Services → Library
   - Search "Google Calendar API"
   - Click Enable

4. **Create OAuth 2.0 Credentials**:
   - APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Personal Dashboard"
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
   - Click Create
   - **Save the Client ID and Client Secret**

5. **Get the Refresh Token**:
   ```bash
   # Run this script to get your refresh token
   curl -X POST https://oauth2.googleapis.com/token \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "refresh_token=YOUR_REFRESH_TOKEN" \
     -d "grant_type=refresh_token"
   ```

## Switching to Improved Implementation

To use the improved calendar API that doesn't require external scripts:

1. **Update the import** in `app/api/calendar/events/route.ts`:
   ```typescript
   // Change this:
   import { getUpcomingEvents } from '@/lib/api/calendar';
   
   // To this:
   import { getUpcomingEvents } from '@/lib/api/calendar-improved';
   ```

2. **Update environment variables**:
   - Remove: `GCAL_REFRESH_SCRIPT`
   - Add:
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `GOOGLE_REFRESH_TOKEN`

3. **Redeploy** the application

## Benefits of Improved Implementation

- ✅ Works in Docker containers (no external script needed)
- ✅ Handles token refresh automatically
- ✅ Caches access token to reduce API calls
- ✅ More portable and production-ready
- ✅ No file system dependencies

## Troubleshooting

### "Google OAuth credentials not configured"
- Verify all three environment variables are set
- Check for typos in variable names

### "Failed to refresh Google token: 401"
- Refresh token might be expired or invalid
- Regenerate OAuth credentials following Option 2 above

### "Calendar API not enabled"
- Enable the Google Calendar API in Google Cloud Console
- Wait a few minutes for changes to propagate
