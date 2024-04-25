import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { createMyRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateMyRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateMyRestaurant : createMyRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
