import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: "Too Many Requests",
      message: "Please try again later",
      retryAfter: Math.ceil(options.windowMs / 1000),
    });
  },
  skip: (req) => {
    return req.path === "/health" || req.ip === "127.0.0.1";
  },
  keyGenerator: (req) => {
    return req.headers["x-api-key"] || req.ip;
  },
});
