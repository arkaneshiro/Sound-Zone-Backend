const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

const router = express.Router();

// get userId
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    res.json({
        user: {
            username: user.username,
            bio: user.bio,
            imgUrl: user.imgUrl,
        },
    });
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

router.delete("/:id(\\d+)", requireAuth, asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);

    // console.log(req.user.id)
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
