const getAllTasks = (req, res) => {
    res.send('get all');
}

const createTask = (req, res) => {
    res.send('create');
}

const getTask = (req, res) => {
    res.send('get');
}

const updateTask = (req, res) => {
    res.send('update')
}

const deleteTask = (req, res) => {
    res.send('delete');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}