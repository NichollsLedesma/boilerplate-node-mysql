import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 5242880,
      maxFiles: 5,
      handleExceptions: true,
      filename: `${__dirname}/../logs/logs.log`,
    }),
    new transports.Console({
      level: "debug",
    }),
  ],
});
