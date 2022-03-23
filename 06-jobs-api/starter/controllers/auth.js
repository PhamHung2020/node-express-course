const User = require('../models/User');
const passwordUtils = require('../utils/password.utils');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    // extract info (name, email, password) from req.body
    const { name, email, password } = req.body;
    // validate the info
    // ** TODO **
    // hash password
    const hashedPassword = await passwordUtils.hashPassword(password);
    // create user with the info and hashed password
    const user = await User.create({ name, email, password: hashedPassword });
    // generate token from id, name
    const token = jwt.sign({ 
        id: user._id, 
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    // return username, token
    return res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    // extract info (email, password) from req.body
    const { email, password } = req.body;
    // validate the info - TODO
    // check if the user with email exist
    const user = await User.findOne({ email });
    // if not, return bad request
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // compare password
    const isPasswordCorrect = await passwordUtils.comparePassword(password, user.password);
    // if password is not correct, return unauthenticated
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // generate token from id, name
    const token = jwt.sign({ 
        id: user._id, 
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    // return
    return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

module.exports = {
    register,
    login
}