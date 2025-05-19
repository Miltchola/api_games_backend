import userService from '../service/user.service.js';
import { validationResult } from 'express-validator';

const register = async (req, res) => {
    console.log("Registering user:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const newUser = await userService.registerUser({ username, email, password });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(400).send({ message: error.message });
    }
};

const login = async (req, res) => {
    console.log("Logging in user:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const { token, user } = await userService.loginUser({ email, password });
        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(400).send({ message: error.message });
    }
};

export default { register, login };