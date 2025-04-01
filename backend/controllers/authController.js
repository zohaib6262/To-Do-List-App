const { User } = require("../models");
const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({
      success: true,
      msg: "User create successfully!",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = { signup };
