import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useMentalHealthResources() {
  const { data, error, isLoading } = useSWR('/api/mental-health-resources', fetcher);
  return {
    resources: data?.data || [],
    isLoading,
    isError: error
  };
}