import { useEffect, useState } from 'react';

/**
 * Wraps any async query function with the loading/error/data state every
 * data-driven page needs. Pass the function itself (not its result) so this
 * hook controls when it runs:
 *
 *   const { data, loading, error } = useSupabaseQuery(getActiveFaqs);
 */
export function useSupabaseQuery(queryFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    queryFn()
      .then((result) => {
        if (isMounted) setData(result);
      })
      .catch((err) => {
        // Swallowing this silently is exactly what made the blank Countries
        // section hard to diagnose. Logging it costs nothing in production
        // (visitors never open devtools) but saves real debugging time.
        console.error('Supabase query failed:', err);
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Prevents a "set state on unmounted component" warning if the user
    // navigates away before the request finishes.
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}