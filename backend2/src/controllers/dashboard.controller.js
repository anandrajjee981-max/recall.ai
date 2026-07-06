const SavedItem = require("../models/SavedItem.model");
const Library = require("../models/Library.model");

// @route  GET /api/dashboard
// @desc   Summary stats for the logged-in user's home screen
const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalItems = await SavedItem.countDocuments({ user: userId });
    const totalLibraries = await Library.countDocuments({ user: userId });

    const recentItems = await SavedItem.find({ user: userId })
      .populate("library", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const libraries = await Library.find({ user: userId }).sort({ createdAt: -1 });

    // Count how many items exist per library (for "AI Generated Libraries" overview)
    const libraryStats = await SavedItem.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$library", count: { $sum: 1 } } },
    ]);

    // Merge item counts into the library list
    const librariesWithCounts = libraries.map((lib) => {
      const stat = libraryStats.find((s) => String(s._id) === String(lib._id));
      return {
        _id: lib._id,
        name: lib.name,
        autoCreated: lib.autoCreated,
        itemCount: stat ? stat.count : 0,
      };
    });

    res.status(200).json({
      totalItems,
      totalLibraries,
      recentItems,
      libraries: librariesWithCounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboard };