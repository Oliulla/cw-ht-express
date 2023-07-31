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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_model_1 = require("./cow.model");
// Create a new cow
function createCow(cowData) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdCow = yield cow_model_1.Cow.create(cowData);
        return createdCow;
    });
}
function getAllCows(paginationOptions, filterOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { searchTerm } = filterOptions, filtersData = __rest(filterOptions
        // console.log(filtersData, searchTerm)
        , ["searchTerm"]);
        // console.log(filtersData, searchTerm)
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        let filter = {};
        if (filterOptions.minPrice) {
            filter.price = { $gte: filterOptions.minPrice };
        }
        if (filterOptions.maxPrice) {
            filter.price = Object.assign(Object.assign({}, filter.price), { $lte: filterOptions.maxPrice });
        }
        if (filterOptions.location) {
            filter.location = filterOptions.location;
        }
        let searchQuery = {};
        if (searchTerm) {
            searchQuery = {
                $or: [
                    { location: { $regex: searchTerm, $options: "i" } },
                    { breed: { $regex: searchTerm, $options: "i" } },
                    { category: { $regex: searchTerm, $options: "i" } },
                ],
            };
        }
        let cowsQuery = cow_model_1.Cow.find();
        if (Object.keys(filter).length > 0 && Object.keys(searchQuery).length > 0) {
            cowsQuery = cowsQuery.and([filter, searchQuery]);
        }
        else if (Object.keys(filter).length > 0) {
            cowsQuery = cowsQuery.where(filter);
        }
        else if (Object.keys(searchQuery).length > 0) {
            cowsQuery = cowsQuery.where(searchQuery);
        }
        const result = yield cowsQuery.sort(sortConditions).skip(skip).limit(limit);
        // console.log(result)
        // const total = await Cow.countDocuments()
        return {
            meta: {
                page,
                limit,
                total: result.length,
            },
            data: result,
        };
    });
}
// Get a cow by ID
function getCowById(cowId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cow = yield cow_model_1.Cow.findById(cowId);
        return cow;
    });
}
// Update a cow by ID
function updateCowById(cowId, updatedCowData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedCow = yield cow_model_1.Cow.findByIdAndUpdate(cowId, updatedCowData, {
            new: true,
        });
        return updatedCow;
    });
}
// Delete a cow by ID
function deleteCowById(cowId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield cow_model_1.Cow.findByIdAndDelete(cowId);
        return result;
    });
}
exports.cowService = {
    getAllCows,
    createCow,
    getCowById,
    updateCowById,
    deleteCowById,
};
