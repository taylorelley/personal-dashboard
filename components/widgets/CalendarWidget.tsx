'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { CalendarEvent } from '@/types/calendar';
import { format, parseISO } from 'date-fns';

interface CalendarWidgetProps {
  initialEvents: CalendarEvent[];
}

export function CalendarWidget({ initialEvents }: CalendarWidgetProps) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/calendar/events');
        if (response.ok) {
          const updatedEvents = await response.json();
          setEvents(updatedEvents);
        }
      } catch (error) {
        console.error('Failed to refresh events:', error);
      }
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  function formatEventTime(event: CalendarEvent): string {
    const dateStr = event.start.dateTime || event.start.date;
    if (!dateStr) return '';
    
    try {
      const date = parseISO(dateStr);
      if (event.start.dateTime) {
        return format(date, 'MMM d, h:mm a');
      } else {
        return format(date, 'MMM d (All day)');
      }
    } catch {
      return dateStr;
    }
  }

  return (
    <Card title="📅 Upcoming Events" className="md:col-span-2">
      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming events</p>
        ) : (
          events.slice(0, 6).map((event) => (
            <div
              key={event.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {event.summary}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatEventTime(event)}
              </p>
              {event.location && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  📍 {event.location}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
