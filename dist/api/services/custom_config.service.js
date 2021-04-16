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
exports.addUserConfig = exports.getUserConfig = void 0;
const custom_config_1 = __importDefault(require("../../models/custom_config"));
const ErrorResponse_1 = __importDefault(require("../../utils/ErrorResponse"));
const getUserConfig = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield custom_config_1.default.findOne({ where: { user_id: userId } });
});
exports.getUserConfig = getUserConfig;
const addUserConfig = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const config = exports.getUserConfig(userId);
    if (config) {
        throw ErrorResponse_1.default.unprocessableEntity("config already exists");
    }
    const newConfig = new custom_config_1.default();
    newConfig.user_id = userId;
    yield newConfig.save();
    return newConfig;
});
exports.addUserConfig = addUserConfig;
//# sourceMappingURL=custom_config.service.js.map