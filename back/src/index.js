require("dotenv").config();
const express = require("express");
const cors = require("cors"); 

const errorHandler = require("./middleware/error")
const bookRoute = require("./routes/book-route");
const authRoute = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoute);
app.use("/api/login", authRoute);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server run in port" + " " + port);
});