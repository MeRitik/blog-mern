import User from "../models/User.js";
import { generateToken } from "../utills/jwt.js";

/*==============================
    Signup
===============================*/
export const signup = async (req, res) => {
    console.log("Signup request received:", req.body);
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return res
                .status(400)
                .json({ message: 'Username or Email already in use' });
        }

        const user = await User.create({username, email, password});

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });

    } catch (error) {
        console.error("Error during signup:", error);
        res
        .status(500)
        .json({ message: 'Signup failed', error: error.message });
    }
};

/*==============================
    Login
===============================*/
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and Password are required' });
        }

        const user = await User.findOne({ email })
                        .select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res
                .status(401)
                .json({ message: 'Invalid Email or Password' });
        }

        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            }
        });
    } catch (error) {

    }
}