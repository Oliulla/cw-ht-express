/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose"
import { paginationHelpers } from "../../../helpers/paginationHelper"
import { IGenericResponse } from "../../../interface/common"
import { IPaginationOptions } from "../../../interface/pagination"
import { ICow, ICowFilters } from "./cow.interface"
import { Cow } from "./cow.model"

// Create a new cow
async function createCow(cowData: ICow): Promise<ICow> {
  const createdCow = await Cow.create(cowData)
  return createdCow
}

async function getAllCows(
  paginationOptions: IPaginationOptions,
  filterOptions: ICowFilters
): Promise<IGenericResponse<ICow[]>> {
  const { searchTerm, ...filtersData } = filterOptions
  // console.log(filtersData, searchTerm)
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  let filter: any = {}

  if (filterOptions.minPrice) {
    filter.price = { $gte: filterOptions.minPrice }
  }

  if (filterOptions.maxPrice) {
    filter.price = { ...filter.price, $lte: filterOptions.maxPrice }
  }

  if (filterOptions.location) {
    filter.location = filterOptions.location
  }

  let searchQuery: any = {}

  if (searchTerm) {
    searchQuery = {
      $or: [
        { location: { $regex: searchTerm, $options: "i" } },
        { breed: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    }
  }

  let cowsQuery = Cow.find()

  if (Object.keys(filter).length > 0 && Object.keys(searchQuery).length > 0) {
    cowsQuery = cowsQuery.and([filter, searchQuery])
  } else if (Object.keys(filter).length > 0) {
    cowsQuery = cowsQuery.where(filter)
  } else if (Object.keys(searchQuery).length > 0) {
    cowsQuery = cowsQuery.where(searchQuery)
  }

  const result = await cowsQuery.sort(sortConditions).skip(skip).limit(limit)

  // console.log(result)

  // const total = await Cow.countDocuments()

  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  }
}

// Get a cow by ID
async function getCowById(cowId: string): Promise<ICow | null> {
  const cow = await Cow.findById(cowId)
  return cow
}

// Update a cow by ID
async function updateCowById(
  cowId: string,
  updatedCowData: Partial<ICow>
): Promise<ICow | null> {
  const updatedCow = await Cow.findByIdAndUpdate(cowId, updatedCowData, {
    new: true,
  })
  return updatedCow
}

// Delete a cow by ID
async function deleteCowById(cowId: string) {
  const result = await Cow.findByIdAndDelete(cowId)
  return result
}

export const cowService = {
  getAllCows,
  createCow,
  getCowById,
  updateCowById,
  deleteCowById,
}
