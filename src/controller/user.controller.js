import jwt from 'jsonwebtoken';
import {
  registerUser,
  authenticateUser
} from '../services/user.service.js';

// Regex simples para validar e-mails
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registering user:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required!' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    await registerUser({ username, email, password });
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.message.includes('Email already exists')) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Logging in user:", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    const user = await authenticateUser({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'User logged in successfully!',
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error.message.includes('User not found')) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (error.message.includes('Invalid password')) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export default { register, login };
