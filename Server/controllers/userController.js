const User = require("../models/UserProfile"); 
const Order = require("../models/Order");

exports.getUserProfile = async (req, res) => {
    try {
        // 1. Fetch user profile 
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Fetch Account History (Cars purchased by this user)
        const purchaseHistory = await Order.find({ buyer: req.user.id })
            .populate("car", "make model year price images")
            .sort({ createdAt: -1 });

        // 3. Display user info + history
        return res.status(200).json({
            profile: {
                username: user.username,
                email: user.email,
                joinedAt: user.createdAt
            },
            history: purchaseHistory,
            purchaseCount: purchaseHistory.length
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ 
            message: "Server error fetching profile", 
            error: error.message 
        });
    }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const {username,email } = req.body;

    // Ensure middleware provides req.user with id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (email && email !== user.email) {
      const existing = await User.findOne({ email: email.toLowerCase().trim() });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (typeof username === "string" && username.trim() !== "") {
      user.username = username.trim();
    }
    if (typeof email === "string" && email.trim() !== "") {
      user.email = email.toLowerCase().trim();
    }
    

    const updatedUser = await user.save();

    // Return sanitized user
    return res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};