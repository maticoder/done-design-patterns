const router = require("express").Router();
const { task, getUserTasks } = require("../controllers/tasks");

// auth middleware
const auth = require("../auth/auth");

router.get("/", auth, task);
router.get("/todos", getUserTasks);

module.exports = router;
