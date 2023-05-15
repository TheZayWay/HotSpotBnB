'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages',[
      {reviewId: 1, url: "img url"},
      {reviewId: 2, url: "img url"}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages')
  }
};
