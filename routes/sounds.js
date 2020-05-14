const express = require("express");

const { Sound } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

const router = express.Router();

// create a sound
router.post("/", requireAuth, asyncHandler( async (req, res) => {
    const {
        userId,
        soundUrl,
        waveUrl,
        imageUrl,
        description,
        name,
    } = req.body;

    const playCount = 0;
    const userIdInt = parseInt(userId, 10)

    if (userIdInt !== req.user.id) {
        const err = Error('Unauthorized');
        err.status = 401;
        err.message = 'Not authorized to upload a sound on this account'
        err.title = 'Unauthorized'
        throw err;
    }

    const sound = await Sound.create({
        userId: userIdInt,
        soundUrl,
        imageUrl,
        waveUrl,
        description,
        name,
        playCount,
    });

    res.status(201).json({
        sound,
    });
}));

module.exports = router;
