const express = require("express");
const {
  orgRequest,
  userRequest,
  detailedRequest,
  orgWar,
  userWar,
  addTask,
  addTaskUser,
  addComment,
  editTask,
  deleteTask,
  deleteTaskUsers,
  createdByRequest
} = require("../controllers/tasksController.js");
const router = express.Router();

/*
  ENDPOINTS:
  GET
    /tasks/orgs/:orgid
    /tasks/users/:userid
    /tasks/:taskid
    /war/orgs/:orgid
    /war/users/:userid

  POST
    /tasks
    /tasks/:taskid/comments

  PATCH
    /task/:taskid

  DELETE
    /tasks/:taskid
*/

// GET REQUESTS for /tasks
router.route("/tasks/orgs/:orgid").get(orgRequest);
router.route("/tasks/users/:userid").get(userRequest);
router.route("/tasks/:taskid").get(detailedRequest);
router.route("/tasks/users/:userid/created").get(createdByRequest);
router.route("/war/orgs/:orgid").get(orgWar);
router.route("/war/users/:userid").get(userWar);

// POST REQUESTS for /tasks
router.route("/tasks").post(addTask);
router.route("/tasks/:taskid/comments").post(addComment);
router.route("/owners/:taskid").post(addTaskUser);

// PATCH REQUESTS for /tasks
router.route("/tasks/:taskid").patch(editTask);

// DELETE REQUESTS for /tasks
router.route("/tasks/:taskid").delete(deleteTask);
router.route("/owners/:taskid").delete(deleteTaskUsers);

module.exports = router;
