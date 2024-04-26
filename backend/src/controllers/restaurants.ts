import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    // check if city has restaurants
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      // URL = selectedCuisines=italian,burgers,chinese
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      // restaurantName = Pizza Palace
      // cuisines = italian,pizza,pasta
      // searchQuery = pasta
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // [sortOption]: 1 -> to look for the key in the document
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // 50 result, pageSize = 10, pages = 5
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error searching restaurants",
    });
  }
};
