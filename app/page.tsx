import { Dashboard } from '@/components/Dashboard';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Dashboard />
    </main>
  );
}
