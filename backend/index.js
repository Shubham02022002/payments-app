const express = require("express");
const connectDb = require("./db.js");
const User = require("./models/userSchema.js");
const userRouter = require("./routes/userRoutes.js");
const cors = require("cors")
const router = require("./router.js");
const app = express();


app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log(`server is up`);
});
