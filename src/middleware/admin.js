const db = require('../services/db.service');

async function adminMiddleware(req, res, next) {
    try {
        const [record] = await db.query(
            'SELECT is_admin FROM streamer WHERE username = ?',
            [req.user.username]
        );

        if (!record?.is_admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = adminMiddleware;