const User = require('../models/User');

exports.getProfileDetails = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.upload = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.profil_image_url = `http://localhost:3000/images/${req.file.filename}`;
    await user.save();
    res.status(200).json({
      message: 'Profile image URL updated successfully.',
      imageUrl: user.profil_image_url
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
