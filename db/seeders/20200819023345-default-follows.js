'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert('Follows', [
      {
        followerId: 2,
        followedId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 2,
        followedId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        followerId: 3,
        followedId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{} )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Follows", null, {});
  }
};
