const express = require("express");
const connectDb = require("./db.js");
const User = require("./models/userSchema.js");
const userRouter = require("./routes/userRoutes.js");
const cors = require("cors");
const router = require("./router.js");
const app = express();
require("dotenv/config");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/v1", router);

app.listen(3000, "0.0.0.0",() => {
  console.log(`server is up`);
});
