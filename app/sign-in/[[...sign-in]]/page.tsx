import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700",
            headerTitle: "text-2xl font-orbitron text-gray-900 dark:text-white",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "bg-white dark:bg-navy-700 border-gray-300 dark:border-navy-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-600",
            formFieldLabel: "text-gray-700 dark:text-gray-200",
            formFieldInput: "bg-white dark:bg-navy-700 border-gray-300 dark:border-navy-600 text-gray-900 dark:text-white",
            formButtonPrimary: "bg-magenta hover:bg-magenta/90 text-white",
            footerActionLink: "text-magenta hover:text-magenta/80",
          },
        }}
      />
    </div>
  );
}