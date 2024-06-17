
const jwt = require('jsonwebtoken');
const User = require('../module/userSchema.js');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.header('auth');
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        
        const decoded = jwt.verify(token, 'harsh');
        if (!decoded || !decoded.user || !decoded.user._id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await User.findById(decoded.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        req.user = user; // Passing the entire user object
        next();
    } catch (error) {
        console.log("Error in protectRoute", error);
        res.status(500).json({ error: "Please login first" });
    }
};

module.exports = protectRoute;