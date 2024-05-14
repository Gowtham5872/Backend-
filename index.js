
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoDb = require("./db/config.js");
const router = express.Router();


app.use(express.json());
app.use(cors());



const config = require("./db/config.js");
const Home = require("./controller/controller.js");
const LoginRoute = require("./routes/LoginRoutes.js");
const RegisterRoute = require("./routes/RegisterRoute.js");
const verifyToken = require("./middleware/middleware.js");
const RecipeRoute = require("./routes/RecipeRoutes.js");
const ForgotPassword = require("./routes/ForgotPasswordRoute.js");
const profileRoute = require("./routes/profileRoutes.js");

app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", router);
app.use("/auth", ForgotPassword);
app.use("/auth",profileRoute);

router.get("/", verifyToken, Home.Home);

module.exports = router;




app.get("/", (req, res) => {
  res.redirect("/auth"); 
});



// Call the mongoDb function to connect to the database
mongoDb();

app.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
});
