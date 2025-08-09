// Placeholder route while Clerk is disabled in production

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-sm text-muted-foreground mb-6">Account creation is temporarily disabled in this preview build.</p>
        <a href="/contact" className="inline-flex items-center px-4 py-2 rounded-md border border-white/20">Contact us</a>
      </div>
    </div>
  );
}