const express = require("express");
const bcrypt = require("bcryptjs");

const { User, Sound, Follows } = require("../db/models");
const { asyncHandler } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

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
// TODO: update this to get only data of user + followings
router.get("/:id/feed", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const sounds = await Sound.findAll({
        include: { model: User, attributes: ["username", "id"]},
    })
    res.json({
        sounds
    });
}));

// gets username's and id's of all users to run frontend search feature
router.get("/", asyncHandler(async (req, res) => {
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

// sign up
router.post("/", asyncHandler(async (req, res) => {
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
router.post("/token", asyncHandler(async (req, res) => {
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
        err.errors = ["The provided credentials were invalid."];
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
router.delete("/:id", requireAuth, asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);

    if (user.id !== req.user.id) {
        const err = Error('Unauthorized');
        err.status = 401;
        err.message = 'Not authorized to delete this User'
        err.title = 'Unauthorized'
        throw err;
    }

    if (user) {
        await user.destroy();
        res.status(204).send(`Deleted user with id of ${req.params.id}.`);
    }
}));

module.exports = router;
