import { Request, Response } from "express"
import { cowService } from "./cow.service"
import sendResponse from "../../../shared/sendResponse"
import { ICow, ICowFilters } from "./cow.interface"
import catchAsync from "../../../shared/catchAsync"
import pick from "../../../shared/pick"
import { paginationFields } from "../../../constants/pagination"
import { filterableFields } from "./cow.constants"

// Handler for POST /cows
const createCow = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body
  const createdCow = await cowService.createCow(cowData)

  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: "Cow created successfully!",
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
    data: createdCow,
  })
})

// Handler for GET cows
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters: ICowFilters = pick(
    req.query,
    filterableFields
  ) as unknown as ICowFilters
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(filters)

  const cows = await cowService.getAllCows(paginationOptions, filters)

  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: 200,
    message: "Cows retrieve successfully",
    meta: cows.meta,
    data: cows.data,
  })
})

// Handler for GET /cows/:id
const getCowById = catchAsync(async (req: Request, res: Response) => {
  const cowId = req.params.id
  const cow = await cowService.getCowById(cowId)

  sendResponse<ICow>(res, {
    success: true,
    statusCode: 200,
    message: "Cow retrieve successfully",
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
    data: cow,
  })
})

// Handler for PUT /cows/:id
const updateCowById = catchAsync(async (req: Request, res: Response) => {
  const cowId = req.params.id
  const updatedCowData = req.body
  const updatedCow = await cowService.updateCowById(cowId, updatedCowData)

  sendResponse<ICow>(res, {
    success: true,
    statusCode: 200,
    message: "Cow updated successfully",
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
    data: updatedCow,
  })
})

// Handler for DELETE /cows/:id
const deleteCowById = catchAsync(async (req: Request, res: Response) => {
  const cowId = req.params.id
  const result = await cowService.deleteCowById(cowId)
  sendResponse<ICow>(res, {
    success: true,
    statusCode: 200,
    message: `Cow deleted successfully`,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
    data: result,
  })
})

export const cowController = {
  getAllCows,
  createCow,
  getCowById,
  updateCowById,
  deleteCowById,
}
