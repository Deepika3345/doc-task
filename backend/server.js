const express = require("express");
const cors =require('cors')
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();



// connect DB
connectDB();
// cors
app.use(cors())


// make static file
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'))

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// auth Router
app.use("/api/auth", require("./routes/authRoutes"));

// docs Router
app.use("/api/doc", require("./routes/docRoutes"));





app.listen(PORT, () => {
  console.log(`Welcome on machine task ${PORT}`);
});

