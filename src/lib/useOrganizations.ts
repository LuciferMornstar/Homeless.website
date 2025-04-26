import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useOrganizations() {
  const { data, error, isLoading } = useSWR('/api/organizations', fetcher);
  return {
    organizations: data?.data || [],
    isLoading,
    isError: error
  };
}