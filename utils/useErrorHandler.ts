import { useState } from "react";

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  function handleError(message: string) {
    console.error(message);
    setError(message);
  }

  function clearError() {
    setError(null);
  }

  return { error, setError: handleError, clearError };
}
