const mongoose = require("mongoose");
const authModel = require("../models/authModel");

const docSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: authModel,
    },
    title: {
      type: String,
      require: [true, "Enter title"]
    },
    description: {
      type: String,
      require: [true, "Enter description"],
    },
    img: {
      type: String,
      require: [true, "file"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Docs", docSchema);
