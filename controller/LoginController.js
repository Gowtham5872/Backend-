const{ User} = require("../schema/schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
     console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ poperror: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET
    );

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
    console.log(token);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = Login;