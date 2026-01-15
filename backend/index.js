const dbConnect = require("./db/db");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

const userRouter = require("./routes/userRoutes.js");
const accountRouter = require("./routes/accountRoutes.js");
app.use(cors());
app.use(bodyParser.json());

dbConnect();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
