import { useState, useEffect } from "react";

export function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
  const [loading, setLoading] = useState<true | false>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  function reset() {
    setLoading(false);
    setError(null);
    setData(null);
  }

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
      return result; // what is returned would be defined in fetchFunction
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
}
