const AuthService = require('../services/authService');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const result = await AuthService.verifyTokenAndGetUser(token);

        if (!result.success) {
            return res.status(401).json({ error: result.error });
        }

        // Attach user to request object
        req.user = result.user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
