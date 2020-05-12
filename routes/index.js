const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: 'index router' });
});

module.exports = router;
