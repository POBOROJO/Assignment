import Task from "../model/Task.js";

export const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;
  if (priority) taskFields.priority = priority;
  if (dueDate) taskFields.dueDate = dueDate;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true },
    );
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
