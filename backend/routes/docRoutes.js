const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const {
  createDoc,
  getAllDocs,
  getDoc,
  deleteDoc,
  editDoc,
} = require("../controllers/docControllers");
const uploads = require("../middleware/multer");
const router = express.Router();

router.post("/", authMiddleware, uploads.single("img"), createDoc);
router.get("/", authMiddleware, getAllDocs);
router.get("/:id", authMiddleware, getDoc);
router.delete("/:id", authMiddleware, deleteDoc);
router.put("/:id", authMiddleware, editDoc);
module.exports = router;
