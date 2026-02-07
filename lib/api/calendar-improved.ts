/**
 * Improved Google Calendar API client that handles OAuth refresh internally
 * without requiring external script
 * 
 * Environment variables needed:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET  
 * - GOOGLE_REFRESH_TOKEN
 */

import { CalendarEvent } from '@/types/calendar';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Google OAuth credentials not configured');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Google token: ${response.status}`);
  }

  const data: TokenResponse = await response.json();
  
  // Cache the token
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000; // Expire 1 min early
  
  return data.access_token;
}

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }
  
  // Otherwise refresh
  return refreshAccessToken();
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const token = await getAccessToken();
  
  const now = new Date().toISOString();
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
    `timeMin=${now}&timeMax=${weekLater}&singleEvents=true&orderBy=startTime&maxResults=10`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error(`Google Calendar API error: ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}
