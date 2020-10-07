const router = require("express").Router();
const {
    task,
    getUserData,
    addProject,
    removeProject,
} = require("../controllers/tasks");

// auth middleware
const auth = require("../auth/auth");

router.get("/", auth, task);
router.get("/todos", getUserData);
router.post("/add-project", auth, addProject);
router.post("/remove-project", auth, removeProject);

module.exports = router;
