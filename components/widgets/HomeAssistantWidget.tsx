'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { HomeAssistantStatus } from '@/types/homeassistant';

interface HomeAssistantWidgetProps {
  initialStatus: HomeAssistantStatus;
}

export function HomeAssistantWidget({ initialStatus }: HomeAssistantWidgetProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/homeassistant/status');
        if (response.ok) {
          const updatedStatus = await response.json();
          setStatus(updatedStatus);
        }
      } catch (error) {
        console.error('Failed to refresh Home Assistant status:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAlarmColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'disarmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'armed_away':
      case 'armed_home':
      case 'armed_night':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
      case 'arming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatAlarmState = (state: string) => {
    return state
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card title="🏠 Home Status">
      <div className="space-y-4">
        {/* Alarm Status */}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Alarm</p>
          <div className={`px-3 py-2 rounded-lg text-center font-medium ${getAlarmColor(status.alarm.state)}`}>
            {formatAlarmState(status.alarm.state)}
          </div>
        </div>

        {/* Cameras */}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Cameras ({status.cameras.filter(c => c.online).length}/{status.cameras.length})
          </p>
          <div className="space-y-2">
            {status.cameras.map((camera) => (
              <div
                key={camera.entityId}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {camera.name}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    camera.online
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {camera.online ? 'Online' : 'Offline'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
