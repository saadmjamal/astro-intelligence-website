// Remove auth requirement for static builds (replace with public layout)
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      {/* Dashboard Navigation */}
      <div className="bg-white dark:bg-navy-800 shadow-sm border-b border-gray-200 dark:border-navy-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <nav className="flex space-x-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/scripts"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Scripts
              </Link>
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Billing
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}