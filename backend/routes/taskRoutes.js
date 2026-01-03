const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/**
 * POST – Create Task
 */
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET – Fetch All Tasks
 * Bonus: Sorted by due date
 */
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
});

/**
 * PUT – Update Task Status
 */
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

/**
 * DELETE – Delete Task
 */
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
