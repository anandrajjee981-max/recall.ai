const Library = require("../models/Library.model");

// @route  POST /api/libraries
// @desc   Create a new library manually
const createLibrary = async (req, res) => {
  try {
    const { name, parentLibrary } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Library name is required" });
    }

    const library = await Library.create({
      name,
      user: req.user._id,
      parentLibrary: parentLibrary || null,
      autoCreated: false, // manually created by user
    });

    res.status(201).json(library);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/libraries
// @desc   Get all libraries for the logged-in user
const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  DELETE /api/libraries/:id
const deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findOne({ _id: req.params.id, user: req.user._id });

    if (!library) {
      return res.status(404).json({ message: "Library not found" });
    }

    await library.deleteOne();
    res.status(200).json({ message: "Library deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createLibrary, getLibraries, deleteLibrary };