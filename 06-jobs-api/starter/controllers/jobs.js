const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id}).sort('createdAt');
    return res.status(StatusCodes.OK).json({ jobs });
}

const getJob = (req, res) => {
    res.send('get job');
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.id;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = (req, res) => {
    res.send('update job');
}

const deleteJob = (req, res) => {
    res.send('delete job');
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}