"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterableFields = exports.searchableFields = exports.queryParams = void 0;
exports.queryParams = {
    page: "page",
    limit: "limit",
    sortBy: "sortBy",
    sortOrder: "sortOrder",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    location: "location",
    searchTerm: "searchTerm",
};
exports.searchableFields = ["location", "breed", "category"];
exports.filterableFields = [
    "searchTerm",
    "minPrice",
    "maxPrice",
    "location",
];
