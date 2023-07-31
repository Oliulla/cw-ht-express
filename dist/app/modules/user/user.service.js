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
exports.userService = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/* eslint-disable @typescript-eslint/no-unused-vars */
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = __importDefault(require("./user.model"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
function createUser(profileData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, address, budget, income, phoneNumber, role, password } = profileData;
        // Check if the phoneNumber already exists in the users collection
        const existingUser = yield user_model_1.default.findOne({ phoneNumber }).exec();
        if (existingUser) {
            throw new ApiError_1.default(400, "User with the provided phone number already exists");
        }
        const newUser = new user_model_1.default({
            password,
            role,
            name,
            phoneNumber,
            address,
            budget: role === user_interface_1.UserRole.SELLER ? 0 : budget,
            income,
        });
        yield newUser.save();
        const _a = newUser.toObject(), { password: userPassword } = _a, createdUserData = __rest(_a, ["password"]);
        return createdUserData;
    });
}
exports.createUser = createUser;
const userLogin = (phoneNumber, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ phoneNumber }).exec();
    const userJSON = user === null || user === void 0 ? void 0 : user.toJSON();
    if (!userJSON) {
        throw new ApiError_1.default(401, "Invalid phone number or password");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, userJSON.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(401, "Invalid phone number or password");
    }
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ user_id: userJSON._id, role: userJSON.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ user_id: userJSON._id, role: userJSON.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(403, "Invalid Refresh Token");
    }
    const { user_id } = verifiedToken;
    const user = yield user_model_1.default.findById(user_id).exec();
    if (!user) {
        throw new ApiError_1.default(404, "User does not exist");
    }
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        user_id: user._id,
        role: user.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.userService = {
    createUser,
    userLogin,
    refreshToken,
};
