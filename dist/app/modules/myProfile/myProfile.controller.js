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
exports.userProfileController = void 0;
const myProfile_service_1 = require("./myProfile.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getUserProfiles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield myProfile_service_1.userProfileServices.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieve successfully",
        data: result,
    });
}));
const getSingleUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield myProfile_service_1.userProfileServices.getSingleUser(userId);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 404,
            message: "User profile not found",
            data: result,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
const updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updates = req.body;
    const result = yield myProfile_service_1.userProfileServices.updateUser(userId, updates);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "User profile not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile updated successfully",
        data: result,
    });
}));
const deleteUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield myProfile_service_1.userProfileServices.deleteUser(userId);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "User profile not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile deleted successfully",
        data: result,
    });
}));
// Get the profile information of the currently authenticated user
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.user;
    const result = yield myProfile_service_1.userProfileServices.getMyProfile(user_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User's information retrieved successfully",
        data: result,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.user;
    const updates = req.body;
    const result = yield myProfile_service_1.userProfileServices.updateMyProfile(user_id, updates);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User's information updated successfully",
        data: result,
    });
}));
exports.userProfileController = {
    getUserProfiles,
    getSingleUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getMyProfile,
    updateMyProfile,
};
