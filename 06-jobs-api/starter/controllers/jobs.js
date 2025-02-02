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

const updateJob = async (req, res) => {
    const { id: userId, name: username } = req.user;
    const jobId = req.params.id;

    const job = await Job.findOneAndUpdate({
        _id: jobId,
        createdBy: userId,
    }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!job) {
        throw new NotFoundError(`User ${username} has no job with id ${jobId}`);
    }

    return res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const { id: userId, name: username } = req.user;
    const jobId = req.params.id;

    const job = await Job.findOneAndRemove({
        _id: jobId,
        createdBy: userId,
    });

    if (!job) {
        throw new NotFoundError(`User ${username} has no job with id ${jobId}`);
    }

    return res.status(StatusCodes.NO_CONTENT).send();
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}