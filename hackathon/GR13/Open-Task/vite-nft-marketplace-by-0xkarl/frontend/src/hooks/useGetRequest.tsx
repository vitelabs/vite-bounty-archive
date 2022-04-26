import { useState, useEffect } from 'react';

function useGetRequest<T>(url: string | null, query?: any) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const unsubs = [
      () => {
        isMounted = false;
      },
    ];

    const load = async () => {
      const res = await fetch(url, query);
      const data = await res.json();
      if (isMounted) {
        setData(data);
      }
    };

    load();

    return () => unsubs.forEach((unsub) => unsub());
  }, [url, query]);

  return data;
}

export default useGetRequest;
