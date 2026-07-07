const { z } = require("zod");

const createItemSchema = z.object({
  sourceType: z.enum([
    "instagram_post",
    "instagram_reel",
    "amazon_product",
    "youtube_video",
    "linkedin_post",
    "twitter_bookmark",
    "browser_bookmark",
    "article",
    "pdf",
    "manual",
  ]),
  url: z.string().url("Must be a valid URL"),
  title: z.string().optional(),
  rawContent: z.string().optional(),
  library: z.string().min(1, "Library is required"),
});

const aiSaveItemSchema = z.object({
  sourceType: z.enum([
    "instagram_post",
    "instagram_reel",
    "amazon_product",
    "youtube_video",
    "linkedin_post",
    "twitter_bookmark",
    "browser_bookmark",
    "article",
    "pdf",
    "manual",
  ]),
  url: z.string().url("Must be a valid URL"),
  title: z.string().optional(),
  rawContent: z.string().optional(),
});

module.exports = { createItemSchema, aiSaveItemSchema };