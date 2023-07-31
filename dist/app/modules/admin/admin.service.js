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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const admin_model_1 = require("./admin.model");
const user_model_1 = __importDefault(require("../user/user.model"));
const user_interface_1 = require("../user/user.interface");
const createAdmin = (adminUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password, name, address } = adminUserData;
    const existingUser = yield user_model_1.default.findOne({ phoneNumber }).exec();
    if (existingUser) {
        throw new ApiError_1.default(400, "User with the provided phone number is already exists");
    }
    const newAdmin = new admin_model_1.Admin({
        phoneNumber,
        password,
        role: user_interface_1.UserRole.ADMIN,
        name,
        address,
    });
    const savedAdmin = yield newAdmin.save();
    const _a = savedAdmin.toJSON(), { password: adminSavedPass } = _a, adminSavedProps = __rest(_a, ["password"]);
    return adminSavedProps;
});
const adminLogin = (phoneNumber, password) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(phoneNumber, password)
    const admin = yield admin_model_1.Admin.findOne({ phoneNumber }).exec();
    const adminJSON = admin === null || admin === void 0 ? void 0 : admin.toJSON();
    // console.log(adminJSON)
    if (!adminJSON) {
        throw new ApiError_1.default(401, "Invalid phone number or password");
    }
    // Compare the hashed password
    const isPasswordValid = yield bcrypt_1.default.compare(password, adminJSON.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(401, "Invalid phone number or password");
    }
    // Generate the access token
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ admin_id: adminJSON._id, role: adminJSON.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ admin_id: adminJSON._id, role: adminJSON.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(403, "Invalid Refresh Token");
    }
    const { admin_id } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield admin_model_1.Admin.isUserExist(admin_id);
    if (!isUserExist) {
        throw new ApiError_1.default(404, "User does not exist");
    }
    //generate new token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        admin_id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.adminService = {
    createAdmin,
    adminLogin,
    refreshToken,
};
