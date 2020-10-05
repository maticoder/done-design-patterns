const router = require("express").Router();
const { task } = require("../controllers/tasks");

// auth middleware
const auth = require("../auth/auth");

router.get("/", auth, task);

module.exports = router;
