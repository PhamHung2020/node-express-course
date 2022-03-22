
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError('Username or Password is missing', 400);
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(200).send({ 
        message: 'User created',
        token,
    });
}

const dashboard = (req, res) => {
    const secret = Math.floor(Math.random() * 100);
    res.status(200).json({
        username: req.user.username, 
        message: `Your secret is ${secret}`
    });
}

module.exports = {
    login,
    dashboard
}