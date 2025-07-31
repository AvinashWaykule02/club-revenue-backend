const jwt = require('jsonwebtoken');
const User = require('../models/user_login'); 

// writig protect midlle ware '
exports.protect = async (req , res , next)  => {
    let token;

    //1. get token from authorisation bearer <token>
     if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }
    // 3. verify token
    try {
        const decode = jwt.verify(token, this.process.env.JWT_SECRETE);
         // 4. Attach user to request (excluding password)
        req.user = await User.findById(decoded.id).select("-password");

        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid"
        });
    }
};


exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied: Admins only"
        });
    }
};


module.exports = {
    protect,
    adminOnly
};
