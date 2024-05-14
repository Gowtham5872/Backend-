const { User } = require("../schema/schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password, address, city, country, pincode, phone } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ 
      name, 
      email, 
      password: hash,
      address,
      city,
      country,
      pincode,
      phone,
    });

    const token = jwt.sign(
      { email, _id: newUser._id }, // Pass user information as an object
      process.env.SECRET
    );

    res.json({ newUser, token }); // Include contact details in the response
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = Register;



