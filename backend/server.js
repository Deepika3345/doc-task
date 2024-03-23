const express = require("express");
const cors =require('cors')
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();



const path = require('path')


// connect DB
connectDB();


// make static file
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'))

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors
app.use(cors())


// auth Router
app.use("/api/auth", require("./routes/authRoutes"));

// docs Router
app.use("/api/doc", require("./routes/docRoutes"));


// path
app.get('/',(req,res)=>{
  app.use(express.static(path.resolve(__dirname,'frontend','build')))
  res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
})


app.listen(PORT, () => {
  console.log(`Welcome on machine task ${PORT}`);
});

