import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useFoodBanks(city?: string) {
  const endpoint = city ? `/api/foodbanks?city=${encodeURIComponent(city)}` : '/api/foodbanks';
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  return {
    foodBanks: data?.data || [],
    isLoading,
    isError: error
  };
}