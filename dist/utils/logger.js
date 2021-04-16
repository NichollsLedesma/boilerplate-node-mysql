"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.default = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json(), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            maxsize: 5242880,
            maxFiles: 5,
            handleExceptions: true,
            filename: `${__dirname}/../logs/logs.log`,
        }),
        new winston_1.transports.Console({
            level: "debug",
        }),
    ],
});
//# sourceMappingURL=logger.js.map