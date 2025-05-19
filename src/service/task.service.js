import Tasks from '../models/Tasks.js';

const createTask = async ({ title, description }, userId) => {
    const newTask = await Tasks.create({
        title,
        description,
        completed: false,
        userId,
    });

    console.log(`[${new Date().toISOString()}] Task created for user ${userId}: ${title}`);
    return newTask;
};

const getAllTasks = async (userId) => {
    const tasks = await Tasks.find({ userId });
    console.log(`[${new Date().toISOString()}] Retrieved tasks for user ${userId}`);
    return tasks;
};

const getTasksById = async (taskId, userId) => {
    const task = await Tasks.findOne({ _id: taskId, userId });
    if (!task) throw new Error("Task not found");
    console.log(`[${new Date().toISOString()}] Retrieved task: ${taskId} for user ${userId}`);
    return task;
};

const updateTask = async (taskId, userId, data) => {
    const task = await Tasks.findOneAndUpdate(
        { _id: taskId, userId },
        data,
        { new: true }
    );
    if (!task) throw new Error("Task not found or unauthorized");
    console.log(`[${new Date().toISOString()}] Updated task: ${taskId} for user ${userId}`);
    return task;
};

const updateTaskPartially = async (taskId, userId, data) => {
    const task = await Tasks.findOneAndUpdate(
        { _id: taskId, userId }, 
        { $set: data }, 
        { new: true, runValidators: true } 
    );
    if (!task) throw new Error("Task not found or unauthorized");
    console.log(`[${new Date().toISOString()}] Partially updated task: ${taskId} for user ${userId}`);
    return task;
};

const deleteTask = async (taskId, userId) => {
    const task = await Tasks.findOneAndDelete({ _id: taskId, userId });
    if (!task) throw new Error("Task not found or unauthorized");
    console.log(`[${new Date().toISOString()}] Deleted task: ${taskId} for user ${userId}`);
    return task;
};

export default {
    createTask,
    getAllTasks,
    getTasksById,
    updateTask,
    updateTaskPartially,
    deleteTask,
};
