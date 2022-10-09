const express = require("express");
const router = express.Router();

const todos = require('./todos');
const users = require('./users');


router.get("/", (req, res) => {
  res.send("main page!");
});

router.use("/todos", todos);
router.use('/users', users) 

module.exports = router;
