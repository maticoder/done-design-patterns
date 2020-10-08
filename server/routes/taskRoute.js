const router = require("express").Router();
const {
    task,
    getUserData,
    addTodo,
    editTodo,
    removeTodo,
    addProject,
    removeProject,
} = require("../controllers/tasks");

// auth middleware
const auth = require("../auth/auth");

router.get("/", auth, task);
router.get("/todos", auth, getUserData);
router.post("/add-todo", auth, addTodo);
router.put("/edit-todo", auth, editTodo);
router.delete("/remove-todo", auth, removeTodo);
router.post("/add-project", auth, addProject);
router.post("/remove-project", auth, removeProject);

module.exports = router;
