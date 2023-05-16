'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {id: 1, spotId: 1, userId: 1, review: 'This spot is amazing', stars: 4},
      {id: 2, spotId: 1, userId: 2, review: 'This spot is fine not the best', stars: 3}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews')
  }
};