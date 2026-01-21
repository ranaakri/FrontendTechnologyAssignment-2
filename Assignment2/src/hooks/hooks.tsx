import { useEffect, useState } from "react";

export default function useFetch(query: string) {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setLoading(false);
    setError("");
    try {
      fetch(query)
        .then((response) => response.json())
        .then((data) => setResponse(data))
        .catch((error) => console.error("Error:", error));
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return { response, loading, error };
}
