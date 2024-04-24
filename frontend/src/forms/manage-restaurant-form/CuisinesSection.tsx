import CuisineCheckbox from "./CuisineCheckbox";
import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/resturant-options-config";

const CuisinesSection = () => {
  const { control } = useFormContext<RestaurantFormData>();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-5">
              {cuisineList.map((cuisine) => (
                <CuisineCheckbox cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
