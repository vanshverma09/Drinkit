import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4 bg-background">
      <h2 className="text-6xl font-heading font-bold text-primary mb-4">404</h2>
      <h3 className="text-xl font-bold mb-2">Page Not Found</h3>
      <p className="text-text-secondary max-w-xs mb-8">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
