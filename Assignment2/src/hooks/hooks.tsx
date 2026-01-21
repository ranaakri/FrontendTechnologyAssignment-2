import { useEffect, useState } from "react";

export default function useFetch(query: string) {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    fetch(query)
      .then((res) => res.json())
      .then((data) => setResponse(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
      
  }, [query]);
  useEffect(() => {
    console.log("REsponse", response)
  }, [response])

  return { response, loading, error };
}