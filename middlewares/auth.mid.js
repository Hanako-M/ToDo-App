const jwt = require('jsonwebtoken');
const Users = require('../models/users.models.js');

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get token from cookies
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified:', decodedToken);

        // Find user in database
        const user = await Users.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - User not found" });
        }

        // Attach user to request
        req.userId = decodedToken.id;
        req.user = user;  // ✅ Now user is defined

        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
};


//check current user
//const jwt = require("jsonwebtoken");
//const User = require("../models/User");

// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     console.log(req.cookies.jwt,"ya hana this is the token");
//     if (!token) {
//         req.user = null;
//         res.locals.user = null;
//     }
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await Users.findById(decodedToken.id);
//         if (!user) {
//             req.user = null;
//             res.locals.user = null;
//         }
//         req.user = user; // Attach user to request for controller use
//         res.locals.user = user; // Attach user to response locals (optional)
//     } catch (err) {
//         console.error("JWT Verification Error:", err.message);
//         req.user = null;
//         res.locals.user = null;
//     }
//     next();
// };

module.exports = {checkUser};
