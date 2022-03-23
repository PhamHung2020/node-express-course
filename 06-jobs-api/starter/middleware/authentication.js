const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Unauthenticated');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthenticatedError('Token is invalid');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.name,
        }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Token is invalid');
    } 
}

module.exports = authMiddleware;