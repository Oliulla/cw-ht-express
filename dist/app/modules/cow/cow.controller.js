"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowController = void 0;
const cow_service_1 = require("./cow.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const cow_constants_1 = require("./cow.constants");
// Handler for POST /cows
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const createdCow = yield cow_service_1.cowService.createCow(cowData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cow created successfully!",
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
        data: createdCow,
    });
}));
// Handler for GET cows
const getAllCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_constants_1.filterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    // console.log(filters)
    const cows = yield cow_service_1.cowService.getAllCows(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Cows retrieve successfully",
        meta: cows.meta,
        data: cows.data,
    });
}));
// Handler for GET /cows/:id
const getCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const cow = yield cow_service_1.cowService.getCowById(cowId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Cow retrieve successfully",
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
        data: cow,
    });
}));
// Handler for PUT /cows/:id
const updateCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const updatedCowData = req.body;
    const updatedCow = yield cow_service_1.cowService.updateCowById(cowId, updatedCowData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Cow updated successfully",
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
        data: updatedCow,
    });
}));
// Handler for DELETE /cows/:id
const deleteCowById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.params.id;
    const result = yield cow_service_1.cowService.deleteCowById(cowId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: `Cow deleted successfully`,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
        data: result,
    });
}));
exports.cowController = {
    getAllCows,
    createCow,
    getCowById,
    updateCowById,
    deleteCowById,
};
