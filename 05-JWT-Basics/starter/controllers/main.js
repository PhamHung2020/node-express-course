
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new CustomAPIError('Token is invalid', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const secret = Math.floor(Math.random() * 100);
        res.status(200).json({
            username: decoded.username, 
            message: `Your secret is ${secret}`
        });
    } catch (error) {
        throw new CustomAPIError('No authorized info provided', 401);
    }
}

module.exports = {
    login,
    dashboard
}