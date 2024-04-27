import { useQuery } from "react-query";
import { SearchState } from "@/pages/SearchPage";
import { RestaurantsSearchResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantsRequest =
    async (): Promise<RestaurantsSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));

      const response = await fetch(
        `${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to get restaurants");
      }

      return response.json();
    };

  const { data: results, isLoading } = useQuery(
    // tell use query hook that any time searchState object values change
    // to do the query again, kinda like a useEffect dependency
    ["searchRestaurants", searchState],
    searchRestaurantsRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
