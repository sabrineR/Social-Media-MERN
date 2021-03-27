const express = require("express");
//require connect DB
const connectDB = require("./config/connectDB");

const user = require("./routes/user");
//post
const postRoutes = require("./routes/post")

const app = express();

app.use(express.json());

connectDB();



app.use("/user", user);
app.use("/post",postRoutes)






const PORT = process.env.PORT || 7500;

app.listen(PORT, (err) =>
  err
    ? console.log("Server connection failed", err)
    : console.log(`Server is running on ${PORT}`)
);

