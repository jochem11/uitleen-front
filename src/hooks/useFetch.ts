import { useState, useEffect } from "react";

const buildUrlWithParams = (url: string, params?: Record<string, string | number | boolean>) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
  }

  urlObj.search = searchParams.toString();
  return urlObj.toString();
};

const useFetch = <T>(
  url: string,
  queryParams?: Record<string, string | number | boolean>,
): {
  data: T | null;
  isLoading: boolean;
  isCompleted: boolean;
  error: string | null;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsCompleted(false);
      setError(null);

      const finalUrl = buildUrlWithParams(import.meta.env.VITE_API_URL + url, queryParams);

      try {
        const response = await fetch(finalUrl, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
        setIsCompleted(true);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(queryParams)]);

  return { data, isLoading, isCompleted, error };
};

export default useFetch;

