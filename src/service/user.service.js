import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`[${new Date().toISOString()}] User registered: ${email}`);
    return newUser;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log(`[${new Date().toISOString()}] User logged in: ${email}`);
    return { token, user: userWithoutPassword };
};

export default { registerUser, loginUser };