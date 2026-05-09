const Link = require("../models/Link");
const { nanoid } = require("nanoid");

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const shortCode = nanoid(6);

    const newLink = new Link({
      originalUrl,
      shortCode,
    });

    await newLink.save();

    res.status(201).json({
      shortUrl: `http://localhost:5000/${shortCode}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await Link.findOne({ shortCode });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    link.clicks += 1;

    await link.save();

    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};