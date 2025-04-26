import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useDogFriendlyResources() {
  const { data, error, isLoading } = useSWR('/api/dog-friendly-resources', fetcher);
  return {
    resources: data?.data || [],
    isLoading,
    isError: error
  };
}