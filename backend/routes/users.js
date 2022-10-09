const express = require("express");
const router = express.Router();

const User = require("../models/user");

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find({ is_complete: false });
  res.send(users);
});

// GET user based on ID
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

// POST create new user
router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    title: req.body.title,
    description: req.body.description,
    is_complete: req.body.is_complete || false,
    due_date: req.body.due_date || new Date(),
  });
  await user.save();
  res.send(user);
});

// UPDATE user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.title) {
      user.title = req.body.title;
    }
    if (req.body.description) {
      user.description = req.body.description;
    }
    if (req.body.is_complete) {
      user.is_complete = req.body.is_complete;
    }
    if (req.body.due_date) {
      user.due_date = req.body.due_date;
    }
    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist!" });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User does not exist!" });
  }
});

module.exports = router;
