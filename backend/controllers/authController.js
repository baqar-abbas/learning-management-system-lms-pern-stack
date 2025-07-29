// /controllers/authController.js

// Dummy login controller for now — update with real logic later
const loginControllerMethod = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Temporary response
    res.status(200).json({
      message: "Login route hit successfully!",
      email,
      password,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  loginControllerMethod,
};
