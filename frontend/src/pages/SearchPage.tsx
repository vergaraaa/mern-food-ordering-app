import { useSearchRestaurants } from "@/api/RestaurantsApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results } = useSearchRestaurants(city);

  return (
    <span>
      User searched for {city}
      <div>
        {results?.data.map((restaurant) => (
          <span>{restaurant.restaurantName}</span>
        ))}
      </div>
    </span>
  );
};

export default SearchPage;
