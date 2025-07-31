const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user_login');

// ✅ SIGNUP Controller
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        if (!email.endsWith("@walchandsangli.ac.in")) {
            return res.status(400).json({
                success: false,
                message: "Invalid email domain"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User signup successfully!",
            userId: newUser._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Problem in signup",
            error: err.message
        });
    }
};

// ✅ LOGIN Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password!"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            success: true,
            token,
            message: "User login successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Problem in login",
            error: err.message
        });
    }
};
