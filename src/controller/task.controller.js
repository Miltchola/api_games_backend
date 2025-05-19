import taskService from '../service/task.service.js';

const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;

    console.log(`[${new Date().toISOString()}] Validating task creation for user: ${userId}`);
    if (!title || !description) {
      console.error(`[${new Date().toISOString()}] Validation failed: Title and description are required`);
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = await taskService.createTask({ title, description }, userId);
    console.log(`[${new Date().toISOString()}] Task created successfully for user: ${userId}`);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error creating task: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(`[${new Date().toISOString()}] Retrieving all tasks for user: ${userId}`);
    const tasks = await taskService.getAllTasks(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error retrieving tasks: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    console.log(`[${new Date().toISOString()}] Retrieving task: ${taskId} for user: ${userId}`);
    const task = await taskService.getTasksById(taskId, userId);
    return res.status(200).json(task);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error retrieving task: ${error.message}`);
    return res.status(404).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;
    const data = req.body;

    console.log(`[${new Date().toISOString()}] Validating task update for task: ${taskId} by user: ${userId}`);
    if (!data || Object.keys(data).length === 0) {
      console.error(`[${new Date().toISOString()}] Validation failed: No data provided for update`);
      return res.status(400).json({ error: 'No data provided for update' });
    }

    const updatedTask = await taskService.updateTask(taskId, userId, data);
    console.log(`[${new Date().toISOString()}] Task updated successfully for task: ${taskId} by user: ${userId}`);
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error updating task: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const updateTaskPartially = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const updates = req.body;

  try {
    console.log(`[${new Date().toISOString()}] Validating partial update for task: ${id} by user: ${userId}`);
    if (!updates || Object.keys(updates).length === 0) {
      console.error(`[${new Date().toISOString()}] Validation failed: No data provided for partial update`);
      return res.status(400).json({ error: 'No data provided for partial update' });
    }

    const updatedTask = await taskService.updateTaskPartially(id, userId, updates);
    console.log(`[${new Date().toISOString()}] Task partially updated successfully for task: ${id} by user: ${userId}`);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error partially updating task: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    console.log(`[${new Date().toISOString()}] Validating task deletion for task: ${taskId} by user: ${userId}`);
    const deletedTask = await taskService.deleteTask(taskId, userId);
    console.log(`[${new Date().toISOString()}] Task deleted successfully for task: ${taskId} by user: ${userId}`);
    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error deleting task: ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export default { createTask, getAllTasks, getTaskById, updateTask, updateTaskPartially, deleteTask };