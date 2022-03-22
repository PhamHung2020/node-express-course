const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    // extract info (name, email, password) from req.body
    const { name, email, password } = req.body;
    // validate the info
    // ** use mongoose to validate **

    // generate salt and hash password
    // ** middleware in schema take this responsibility **

    // create user with the info and hashed password
    const user = await User.create({ name, email, password });
    // generate token from id, name
    const token = jwt.sign({ id: user._id, name: user.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    // return username, token
    return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const login = (req, res) => {
    res.send('login');
}

module.exports = {
    register,
    login
}