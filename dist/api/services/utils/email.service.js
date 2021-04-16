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
exports.sendEmailToActive = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../../config"));
const logger_1 = __importDefault(require("../../../utils/logger"));
aws_sdk_1.default.config.update(config_1.default.aws.credentials);
const sendEmailToActive = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const templateData = {
        email, code
    };
    const params = {
        Destination: {
            ToAddresses: [email],
            CcAddresses: []
        },
        ReplyToAddresses: [config_1.default.aws.sender],
        Source: config_1.default.aws.sender,
        Template: config_1.default.aws.templates.register,
        TemplateData: JSON.stringify(templateData)
    };
    const sesService = new aws_sdk_1.default.SES({ apiVersion: '2010-12-01' });
    // @ts-ignore
    return yield sesService.sendTemplatedEmail(params).promise()
        .then((data) => {
        const messageId = data.MessageId;
        logger_1.default.info(`email sent to ${email}: ${messageId}`);
        return messageId;
    })
        .catch((err) => {
        logger_1.default.error(`Error sent email to ${email}: ` + err.message);
    });
});
exports.sendEmailToActive = sendEmailToActive;
//# sourceMappingURL=email.service.js.map