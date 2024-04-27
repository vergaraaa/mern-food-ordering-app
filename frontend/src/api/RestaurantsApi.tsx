import { RestaurantsSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const searchRestaurantsRequest =
    async (): Promise<RestaurantsSearchResponse> => {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurants/search/${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to get restaurants");
      }

      return response.json();
    };

  const { data: results, isLoading } = useQuery(
    "searchRestaurants",
    searchRestaurantsRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
