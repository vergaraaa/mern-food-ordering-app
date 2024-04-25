import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { createMyRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createMyRestaurant}
      isLoading={isCreateLoading}
    />
  );
};

export default ManageRestaurantPage;
