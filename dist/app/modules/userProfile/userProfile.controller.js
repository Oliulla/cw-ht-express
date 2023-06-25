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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileController = void 0;
const userProfile_service_1 = require("./userProfile.service");
const getUserProfiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userProfile_service_1.userProfileServices.getUserProfiles();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users retrieve successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield userProfile_service_1.userProfileServices.getSingleUserProfile(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User profile not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const result = yield userProfile_service_1.userProfileServices.updateUser(userId, updates);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User profile not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield userProfile_service_1.userProfileServices.deleteUser(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User profile not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userProfileController = {
    getUserProfiles,
    getSingleUserProfile,
    updateUserProfile,
    deleteUserProfile,
};
