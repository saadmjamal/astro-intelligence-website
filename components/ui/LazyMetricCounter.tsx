import dynamic from 'next/dynamic';

export const LazyMetricCounter = dynamic(() => import('./MetricCounter').then(mod => ({ default: mod.MetricCounter })), {
  loading: () => (
    <div className="text-center animate-pulse">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-24 mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
    </div>
  ),
});