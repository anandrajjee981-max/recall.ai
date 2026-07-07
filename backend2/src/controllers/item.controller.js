const SavedItem = require("../models/SavedItem.model");
const { generateEmbedding } = require("../services/embedding.service");
const Library = require("../models/Library.model");
const Tag = require("../models/Tag.model");
const { analyzeContent } = require("../services/ai.service");

// @route  POST /api/items
// @desc   Manually save an item (no AI yet — library must be chosen manually for now)
const createItem = async (req, res) => {
  try {
    const { sourceType, url, title, rawContent, library } = req.body;

    if (!sourceType || !url || !library) {
      return res.status(400).json({ message: "sourceType, url, and library are required" });
    }

    // Check for duplicate (same URL already saved by this user)
    const duplicate = await SavedItem.findOne({ user: req.user._id, url });
    if (duplicate) {
      return res.status(409).json({
        message: "This item is already saved",
        existingItem: duplicate,
      });
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

// @route  POST /api/items/ai-save
// @desc   Save an item and let AI categorize it, generate summary/tags, and pick/create a library
const aiSaveItem = async (req, res) => {
  try {
    const { sourceType, url, title, rawContent } = req.body;

    if (!sourceType || !url) {
      return res.status(400).json({ message: "sourceType and url are required" });
    }

    // Check for duplicate (same URL already saved by this user)
    const duplicate = await SavedItem.findOne({ user: req.user._id, url });
    if (duplicate) {
      return res.status(409).json({
        message: "This item is already saved",
        existingItem: duplicate,
      });
    }

    // Get user's existing libraries so AI can decide to reuse or create new
    const existingLibraries = await Library.find({ user: req.user._id });

    const aiResult = await analyzeContent({
      title,
      rawContent,
      sourceType,
      existingLibraries,
    });

    // Find or create the library
    let library = existingLibraries.find(
      (lib) => lib.name.toLowerCase() === aiResult.libraryName.toLowerCase()
    );

    if (!library) {
      library = await Library.create({
        name: aiResult.libraryName,
        user: req.user._id,
        autoCreated: true,
      });
    }

    // Find or create each tag
    const tagIds = [];
    for (const tagName of aiResult.tags) {
      let tag = await Tag.findOne({ name: tagName.toLowerCase(), user: req.user._id });
      if (!tag) {
        tag = await Tag.create({ name: tagName.toLowerCase(), user: req.user._id });
      }
      tagIds.push(tag._id);
    }

    // Generate an embedding from the most meaningful text (title + summary + tags)
    const textToEmbed = `${title || ""} ${aiResult.summary} ${aiResult.tags.join(" ")}`;
    const embedding = await generateEmbedding(textToEmbed);

    // Create the saved item with AI-generated data
    const item = await SavedItem.create({
      user: req.user._id,
      sourceType,
      url,
      title,
      rawContent,
      summary: aiResult.summary,
      keyPoints: aiResult.keyPoints,
      tags: tagIds,
      library: library._id,
      embedding,
    });

    const populatedItem = await SavedItem.findById(item._id)
      .populate("library", "name")
      .populate("tags", "name");

    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(500).json({ message: "AI save failed", error: error.message });
  }
};

// @route  GET /api/items
// @desc   Get all saved items for logged-in user (with optional library filter)
const getItems = async (req, res) => {
  try {
    const { libraryId, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user._id };
    if (libraryId) filter.library = libraryId;

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.min(parseInt(limit), 100); // hard cap to prevent abuse
    const skip = (pageNum - 1) * limitNum;

    const [items, totalCount] = await Promise.all([
      SavedItem.find(filter)
        .populate("library", "name")
        .populate("tags", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      SavedItem.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Items fetched",
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", errors: error.message });
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

    // Track that this item was viewed (for "forgotten saves" reminders)
    item.lastViewedAt = new Date();
    await item.save();

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

module.exports = { createItem, getItems, getItemById, deleteItem, togglePin, aiSaveItem };