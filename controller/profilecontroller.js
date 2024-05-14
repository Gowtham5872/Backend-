const jwt = require('jsonwebtoken');
const { User } = require("../schema/schema.js");

const getUserProfile = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      country: user.country,
      pincode: user.pincode,
      phone: user.phone
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, address, city, country, pincode, phone } = req.body;

    user.name = name;
    user.email = email;
    user.address = address;
    user.city = city;
    user.country = country;
    user.pincode = pincode;
    user.phone = phone;

    await user.save();

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      country: user.country,
      pincode: user.pincode,
      phone: user.phone
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded._id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};





