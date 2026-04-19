const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, skills_offered, skills_wanted, language_preference, college } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name, email, phone, password: hashedPassword, role, skills_offered, skills_wanted, language_preference, college
    });

    await user.save();
    
    // Default 50 credits are added automatically via default in schema
    const { accessToken, refreshToken } = generateTokens(user._id);
    res.status(201).json({ message: 'User created successfully', accessToken, refreshToken, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user._id);
    res.status(200).json({ message: 'Login successful', accessToken, refreshToken, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  // Stub for Google OAuth login
  res.status(200).json({ message: 'Google login placeholder' });
};

exports.sendOtp = async (req, res) => {
  // Stub for sending OTP via Twilio/MSG91
  res.status(200).json({ message: 'OTP sent successfully' });
};

exports.verifyOtp = async (req, res) => {
  // Stub for verifying OTP
  res.status(200).json({ message: 'OTP verified successfully' });
};

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const { accessToken, refreshToken } = generateTokens(decoded.id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

exports.logout = async (req, res) => {
  // Client should delete the token, can add token blacklisting here
  res.status(200).json({ message: 'Logged out successfully' });
};
