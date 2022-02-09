const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");

//chaining routes
router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(updateGoal).delete(deleteGoal);

// router.get("/", getGoals);
// router.post("/", setGoals);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
