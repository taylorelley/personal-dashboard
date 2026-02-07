import { Grid } from '@/components/layout/Grid';
import { TodoistWidget } from '@/components/widgets/TodoistWidget';
import { CalendarWidget } from '@/components/widgets/CalendarWidget';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Suspense } from 'react';

async function fetchDashboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const [tasksRes, eventsRes, weatherRes] = await Promise.all([
      fetch(`${baseUrl}/api/todoist/tasks`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/calendar/events`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/weather`, { cache: 'no-store' }),
    ]);

    const [tasksData, eventsData, weatherData] = await Promise.all([
      tasksRes.ok ? tasksRes.json() : { results: [] },
      eventsRes.ok ? eventsRes.json() : [],
      weatherRes.ok ? weatherRes.json() : { current: {}, forecast: [] },
    ]);

    return { 
      tasks: tasksData.results || [],
      events: eventsData,
      weather: weatherData,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      tasks: [],
      events: [],
      weather: { current: { temp: '0', condition: 'Unknown', icon: '', feelsLike: '0', humidity: '0', windSpeed: '0' }, forecast: [] },
    };
  }
}

export async function Dashboard() {
  const data = await fetchDashboardData();

  return (
    <div className="container mx-auto">
      {/* Header */}
      <header className="p-6 pb-0">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Personal Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Your overview at a glance
        </p>
      </header>

      {/* Dashboard Grid */}
      <Suspense fallback={<LoadingSpinner />}>
        <Grid>
          <TodoistWidget initialTasks={data.tasks} />
          <CalendarWidget initialEvents={data.events} />
          <WeatherWidget initialWeather={data.weather} />
        </Grid>
      </Suspense>
    </div>
  );
}
