import { useQuery } from "react-query";
import { SearchState } from "@/pages/SearchPage";
import { RestaurantsSearchResponse, RestaurantType } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<RestaurantType> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurants/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return await response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "getRestaurant",
    getRestaurantRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return {
    restaurant,
    isLoading,
  };
};

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
      params.set("sortOption", searchState.sortOption);

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
