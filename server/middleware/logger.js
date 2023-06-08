import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

export const loggerMiddleware = (req, res, next) => {
    logger.info({
        method: req.method,
        url: req.url,
        ip: req.ip,
        headers: req.headers,
        body: req.body,
    });
    next();
};
