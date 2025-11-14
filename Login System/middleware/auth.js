var jwt = require('jsonwebtoken');

exports.check_token = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'No token provided' });
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { id: decoded.userId, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}