'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "img url",
        preview: true,
      },
      {
        spotId: 2,
        url: "img url",
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages')
  }
};
