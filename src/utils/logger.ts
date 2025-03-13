import winston from "winston";
import path from "path";
import fs from "fs";

const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: "error" }),
        new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }),
    ],
});

export default logger;