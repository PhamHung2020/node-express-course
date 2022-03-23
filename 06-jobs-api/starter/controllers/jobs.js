const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.id}).sort('createdAt');
    return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const { id: userId, name: username} = req.user;
    const jobId = req.params.id;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    if (!job) {
        throw new NotFoundError(`User ${username} has no job with id ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({ job });
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