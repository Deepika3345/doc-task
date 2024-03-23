// multer

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
    // cb(null,"file" +  Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });
module.exports = uploads;
