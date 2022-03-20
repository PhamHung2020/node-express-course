const getAllTasks = (req, res) => {
    res.send('get all');
}

const createTask = (req, res) => {
    res.send(req.body);
}

const getTask = (req, res) => {
    res.send(req.params);
}

const updateTask = (req, res) => {
    res.send(req.body)
}

const deleteTask = (req, res) => {
    res.send(req.params);
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}