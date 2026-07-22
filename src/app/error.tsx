"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="rounded-full bg-error/10 p-4">
        <AlertTriangle className="h-8 w-8 text-error" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-text-secondary text-sm max-w-sm">
          An unexpected error occurred. Our team has been notified. Please try again.
        </p>
      </div>
      <Button onClick={() => reset()} variant="primary">
        Try again
      </Button>
    </div>
  );
}
