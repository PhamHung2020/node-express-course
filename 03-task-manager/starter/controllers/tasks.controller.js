const taskModel = require('../models/tasks.model');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        return res.status(200).json({tasks});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await taskModel.create(req.body);
        return res.status(201).json({task});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'No task found'});
        }
        return res.status(200).json({task});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskModel.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({ error: 'No task found'});
        }
        return res.status(200).json({task});
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskModel.findOneAndDelete({ _id: taskId });
        if (!task) {
            return res.status(404).json({ error: 'No task found'});
        }
        return res.status(204).json(null);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}