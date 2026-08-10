import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import { limiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/v1/auth", authRouter);

export default app;
