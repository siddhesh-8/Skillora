const User = require('../models/User');

exports.getMatches = async (req, res) => {
  try {
    const { search } = req.query;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If search query is provided, find users by name or skill
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchResults = await User.find({
        _id: { $ne: user._id },
        $or: [
          { name: searchRegex },
          { 'skills_offered.name': searchRegex },
          { skills_wanted: searchRegex }
        ]
      }).limit(20);
      return res.status(200).json(searchResults);
    }

    // Default matching logic: find users who offer what this user wants
    // and want what this user offers
    const matches = await User.find({
      _id: { $ne: user._id },
      'skills_offered.name': { $in: user.skills_wanted },
      skills_wanted: { $in: user.skills_offered.map(s => s.name) }
    }).limit(10);

    // If no exact matches, find people who offer what user wants
    if (matches.length === 0) {
      const partialMatches = await User.find({
        _id: { $ne: user._id },
        'skills_offered.name': { $in: user.skills_wanted }
      }).limit(10);
      return res.status(200).json(partialMatches);
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
