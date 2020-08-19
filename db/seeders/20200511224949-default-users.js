'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = await queryInterface.bulkInsert('Users', [
            {
                username: 'Riki',
                email: 'god@riki.club',
                hashedPassword: bcrypt.hashSync('wow'),
                bio: 'Hi! I\'m Riki <3',
                imgUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589788051/Soundzone/IMG_1877_jjdo5j.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'Guest',
                email: 'guest@riki.club',
                hashedPassword: bcrypt.hashSync('guestPassword'),
                bio: 'Hi! I\'m a Guest!',
                imgUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589327406/Soundzone/default_avatar_avox09.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'Optimus',
                email: 'autobots@riki.club',
                hashedPassword: bcrypt.hashSync('swag'),
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                imgUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589789659/Soundzone/Optimus_Prime_tbgtiq.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],{} );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    }
};
