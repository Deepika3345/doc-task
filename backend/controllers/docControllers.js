const asynchandler = require("express-async-handler");
// const tickets = require("../models/ticketmodel")
const Docs = require("../models/docModel");
const User = require("../models/authModel");

const createDoc = asynchandler(async (req, res) => {
  const { title, description} = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  //get user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const doc = await Docs.create({
    // name: req.user.name,
    title,
    description,
    img: req.file.path,
    user: req.user._id,
  });
  if (!doc) {
    res.status(400);
    throw new Error("Invalid Data");
  }

  res.status(200).json(doc);
});
// All docs
const getAllDocs = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const doc = await Docs.find({ user: req.user._id });

  if (!doc) {
    res.status(400);
    throw new Error("No any document");
  }

  res.status(200).json(doc);
});
// Single doc
const getDoc = asynchandler(async (req, res) => {
  //user from jwt
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  //get ticket by id
  const doc = await Docs.findById(req.params.id);

  if (!doc || doc.user.toString() !== user._id.toString()) {
    res.status(404);
    throw new Error("Doc not Found");
  }

  res.status(200).json(doc);
});
// Delete doc
const deleteDoc = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const data = await Docs.findById(req.params.id);

  if (!data) {
    res.status(400);
    throw new Error("Doc not found");
  }

  if (user._id.toString() !== data.user.toString()) {
    res.status(400);
    throw new Error("Unauthorized");
  }

  await Docs.findByIdAndDelete(data._id);

  res.status(200).json({ msg: "Success" });
})
// Edit Doc
const editDoc = asynchandler(async(req,res) =>{

    const user = await User.findById(req.user._id)

    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    const data = await Docs.findById(req.params.id)

    if(!data){
        res.status(400)
        throw new Error("Doc not found")
    }

 
    if(user._id.toString() !== data.user.toString()){
        res.status(400)
        throw new Error("Unauthorized")
    }

    const doc =  await Docs.findByIdAndUpdate(data._id, req.body ,{new:true})

    if(!doc){
        res.status(400)
        throw new Error("Invalid Credentials")
    }

    res.status(200).json(doc)


})

module.exports = { createDoc, getAllDocs, getDoc, deleteDoc,editDoc };
