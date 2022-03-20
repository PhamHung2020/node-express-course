const express = require('express');
const taskRouter = require('./routes/tasks.route');
const connectDb = require('./db/connect.db');
require('dotenv').config();

const app = express();

const PORT = 3000;

// MIDDLE WARES
app.use(express.static('./public'));
app.use(express.json());

// ROUTES
app.use('/api/v1/tasks', taskRouter);
// GET /api/v1/tasks - get all tasks
// POST /api/v1/tasks - create a new task
// GET /api/v1/tasks/:id - get single task
// PATCH /api/v1/tasks/:id - update task
// DELETE /api/v1/tasks/:id - delete task

const startServer = async () => {
    try {
        //console.log(process.env.MONGO_URI);
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is running in port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startServer();