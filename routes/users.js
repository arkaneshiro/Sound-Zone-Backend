const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

const { User, Sound, Follows } = require("../db/models");
const { asyncHandler } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { validateUserSignUp } = require("../validations")

const router = express.Router();

// get user info
router.get("/:id/getUserInfo", asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id)

  res.json({
    user: {
      id: user.id,
      username: user.username,
      bio: user.bio,
      imgUrl: user.imgUrl,
    },
  });
}));

// gets one user's sounds
router.get("/:id/sounds", asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const sounds = await Sound.findAll({
    include: { model: User, attributes: ["username", "id"]},
    where: { userId }
  })

  res.json({
    sounds
  });
}));

// gets a users 'feed' data,
router.get("/:id/feed", asyncHandler(async (req, res) => {
  const userId = req.params.id;
   const follows = await Follows.findAll({
    attributes: [['followedId', 'id']],
    where: {
      followerId: userId
    },
  })
  const followIdArray = follows.map(follow => follow.id)
  const sounds = await Sound.findAll({
    include: {
      model: User,
      attributes: ["username", "id"],
      where: {
        id: [...followIdArray, userId]
      }
    },
    order: [['createdAt', 'DESC']]
  })

  res.json({
    sounds
  });
}));

// gets username's and id's of all users to run frontend search feature
router.get("/allUsers", asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username']
  })

  res.json({
    users
  })
}));

// gets ids of users followed by user making fetch call
router.get("/followed", requireAuth, asyncHandler(async (req, res) => {
  const id = req.user.id
  const follows = await Follows.findAll({
    attributes: [['followedId', 'id']],
    where: {
    followerId: id
    },
  })

  res.json(
    follows
  )
}));



// Follow Routes

// follow a user
router.post("/follow", requireAuth, asyncHandler( async (req, res) => {
  const {
    followerId,
    followedId
  } = req.body;
  const newFollow = await Follows.create({
    followerId,
    followedId
  });
  const follows = await Follows.findAll({
    attributes: [['followedId', 'id']],
    where: {
      followerId: followerId
    },
  })

  res.status(201).json(
    follows
  )
}));

// unfollow a user
router.delete("/unfollow", requireAuth, asyncHandler( async (req, res) => {
  const {
    followerId,
    followedId
  } = req.body;
  const toDelete = await Follows.findOne({
    where: {
      followerId: followerId,
      followedId: followedId
    },
  });

  if (toDelete) {
    await toDelete.destroy();
    res.status(204).send();
  }
}));



// Authentication routes

// sign up
router.post("/", validateUserSignUp, asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const {
    username,
    email,
    password,
    bio,
    imgUrl,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    hashedPassword,
    bio,
    imgUrl,
  });
  const token = getUserToken(user);

  res.status(201).json({
    user: {
      id: user.id,
      username: user.username,
      bio: user.bio,
      imgUrl: user.imgUrl,
    },
    token,
  });
}));

// login
router.post("/token", asyncHandler(async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  const user = await User.findOne({
    where: {
      username
    }
  });
  const token = getUserToken(user);

  if (!user || !user.validatePassword(password)) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["Incorrect Username or Password."];
    return next(err);
  }

  res.json({
    user: {
      id: user.id,
      username: user.username,
      bio: user.bio,
      imgUrl: user.imgUrl,
    },
    token,
  });
}));

// delete a user
router.delete("/:id", requireAuth, asyncHandler( async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await User.findByPk(id);

  if (user.id !== req.user.id) {
    const err = Error('Unauthorized');
    err.status = 401;
    err.message = 'Not authorized to delete this User'
    err.title = 'Unauthorized'
    return next(err);
  }

  if (user) {
    await user.destroy();
    res.status(204).send();
  }
}));

module.exports = router;
