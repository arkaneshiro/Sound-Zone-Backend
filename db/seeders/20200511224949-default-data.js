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
        ], { returning: true }
        );
        return queryInterface.bulkInsert( "Sounds", [
            {
                userId: users[0].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589788177/Soundzone/2-02_Sugar_Is_Sweeter_gzzbky.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589788191/Soundzone/Sugar_is_Sweeter_hddwkc.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/2-02_Sugar_Is_Sweeter_gzzbky.png",
                description: "classic!",
                name: "Sugar Is Sweeter - Jeff Mills",
                playCount: 0,
                createdAt: new Date("2020-05-18 15:44:01.476-07"),
                updatedAt: new Date("2020-05-18 15:44:01.476-07"),
            },
            {
                userId: users[1].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589789217/Soundzone/1-02_Oh_Messy_Life_qudmzb.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589789244/Soundzone/a1139886656_10_ckmxu3.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/1-02_Oh_Messy_Life_qudmzb.png",
                description: "classic chune wow",
                name: "Oh Messy Life - Cap'n Jazz",
                playCount: 0,
                createdAt: new Date("2020-05-18 15:44:01.476-07"),
                updatedAt: new Date("2020-05-18 15:44:01.476-07"),
            },
            {
                userId: users[2].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589790749/Soundzone/02_Horsepower_dvby6s.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589790758/Soundzone/images_uh1rxq.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/02_Horsepower_dvby6s.mp3",
                description: "insane",
                name: "Horsepower - CJ Bolland",
                playCount: 0,
                createdAt: new Date("2020-05-18 15:44:01.476-07"),
                updatedAt: new Date("2020-05-18 15:44:01.476-07"),
            },
            {
                userId: users[0].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589788399/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589788457/Soundzone/a1809084032_10_fb97s9.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/01_I_Wish_Time_Didn_t_Matter_rdtxni.png",
                description: "amazing flip, great breaks",
                name: "I Wish Time Didn't Matter - Special Request",
                playCount: 0,
                createdAt: new Date("2020-05-15 15:44:01.476-07"),
                updatedAt: new Date("2020-05-15 15:44:01.476-07"),
            },
            {
                userId: users[1].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589789421/Soundzone/02_Strobe_Light_neh98h.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589789439/Soundzone/a0265977949_10_sssren.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/02_Strobe_Light_neh98h.png",
                description: "classic chune wow",
                name: "Strobe Light - Chanel Beads",
                playCount: 0,
                createdAt: new Date("2017-07-10 15:44:01.476-07"),
                updatedAt: new Date("2017-07-10 15:44:01.476-07"),
            },
            {
                userId: users[0].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589788724/Soundzone/02_368ft_High_Rising_bxvqyf.mp3",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589788726/Soundzone/a097be38ef031fc68763bdf1ac6f61fa_gpyeiq.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/02_368ft_High_Rising_bxvqyf.png",
                description: "perfect",
                name: "368ft High and Rising - Sully",
                playCount: 0,
                createdAt: new Date("2020-05-17 15:44:01.476-07"),
                updatedAt: new Date("2020-05-17 15:44:01.476-07"),
            },
            {
                userId: users[2].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589789733/Soundzone/harsh_noise_jugapj.wav",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589789659/Soundzone/Optimus_Prime_tbgtiq.png",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/harsh_noise_jugapj.png",
                description: "ouch my ears this is some very harsh noise owie",
                name: "HARSH_NOISE",
                playCount: 0,
                createdAt: new Date("2020-05-17 15:44:01.476-07"),
                updatedAt: new Date("2020-05-17 15:44:01.476-07"),
            },
            {
                userId: users[2].id,
                soundUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/v1589790026/Soundzone/02_Clearing_amavlj.m4a",
                imageUrl: "https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589789905/Soundzone/a0856938911_10_c8x7h7.jpg",
                waveUrl: "https://res.cloudinary.com/dgzcv1mcs/video/upload/fl_waveform,co_black,b_white/Soundzone/02_Clearing_amavlj.png",
                description: "nice",
                name: "Clearing - Grouper",
                playCount: 0,
                createdAt: new Date("2020-05-18 15:44:01.476-07"),
                updatedAt: new Date("2020-05-18 15:44:01.476-07"),
            },
        ], {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Sounds", null, {});
        return queryInterface.bulkDelete("Users", null, {});
    }
};
