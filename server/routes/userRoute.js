const express = require("express");
const app = express();

const mongoose = require("mongoose");
const User = require("../models/usermodel")

const router=express.Router()
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userData = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const showData = await User.find();
    res.status(200).json(showData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
  try {
    const singleuserData = await User.findById({_id:id});
    res.status(200).json(singleuserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleuserData = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(singleuserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const{name,email,password}=req.body
  try {
      const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
       res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports=router