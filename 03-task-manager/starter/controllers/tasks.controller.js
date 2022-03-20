const taskModel = require('../models/tasks.model');
const asyncWrapper = require('../middlewares/async.middleware');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await taskModel.find({});
    return res.status(200).json({tasks});
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await taskModel.create(req.body);
    return res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const task = await taskModel.findById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'No task found'});
    }
    return res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const task = await taskModel.findByIdAndUpdate(taskId, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return res.status(404).json({ error: 'No task found'});
    }
    return res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const task = await taskModel.findOneAndDelete({ _id: taskId });
    if (!task) {
        return res.status(404).json({ error: 'No task found'});
    }
    return res.status(204).json(null);
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}