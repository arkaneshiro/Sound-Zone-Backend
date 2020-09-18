const express = require("express");
const { validationResult } = require('express-validator');

const { Sound, User } = require("../db/models");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const { validateSoundPost } = require("../validations")


const router = express.Router();

// get sound details
router.get("/:id", asyncHandler(async (req, res) => {
  const id = req.params.id;
  const sound = await Sound.findByPk(id,{
    include: { model: User, attributes: ["username", "id", "imgUrl"]}
  })

  res.json({
    sound
  });
}));

// create a sound
router.post("/", requireAuth, validateSoundPost, asyncHandler( async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
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
    return next(err);
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

// delete a sound
router.delete("/:id", requireAuth, asyncHandler( async (req, res, next) => {
  const soundId = parseInt(req.params.id, 10);
  const sound = await Sound.findByPk(soundId);

  if (sound.userId !== req.user.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to delete this Sound'
    err.title = 'Unauthorized'
    return next(err);
  }

  if (sound) {
    await sound.destroy();
    res.status(204).send(`Deleted sound with id of ${req.params.id}.`);
  }
}));

module.exports = router;
