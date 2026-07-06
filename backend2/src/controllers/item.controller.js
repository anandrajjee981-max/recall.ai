const SavedItem = require("../models/SavedItem.model");
const Library = require("../models/Library.model");

// @route  POST /api/items
// @desc   Manually save an item (no AI yet — library must be chosen manually for now)
const createItem = async (req, res) => {
  try {
    const { sourceType, url, title, rawContent, library } = req.body;

    if (!sourceType || !url || !library) {
      return res.status(400).json({ message: "sourceType, url, and library are required" });
    }

    // make sure the library actually belongs to this user
    const libraryExists = await Library.findOne({ _id: library, user: req.user._id });
    if (!libraryExists) {
      return res.status(404).json({ message: "Library not found" });
    }

    const item = await SavedItem.create({
      user: req.user._id,
      sourceType,
      url,
      title,
      rawContent,
      library,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/items
// @desc   Get all saved items for logged-in user (with optional library filter)
const getItems = async (req, res) => {
  try {
    const { libraryId } = req.query;

    const filter = { user: req.user._id };
    if (libraryId) filter.library = libraryId;

    const items = await SavedItem.find(filter)
      .populate("library", "name")
      .populate("tags", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/items/:id
const getItemById = async (req, res) => {
  try {
    const item = await SavedItem.findOne({ _id: req.params.id, user: req.user._id })
      .populate("library", "name")
      .populate("tags", "name");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await SavedItem.findOne({ _id: req.params.id, user: req.user._id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PATCH /api/items/:id/pin
// @desc   Toggle pin status of an item (used for Collections feature)
const togglePin = async (req, res) => {
  try {
    const item = await SavedItem.findOne({ _id: req.params.id, user: req.user._id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.isPinned = !item.isPinned;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createItem, getItems, getItemById, deleteItem, togglePin };