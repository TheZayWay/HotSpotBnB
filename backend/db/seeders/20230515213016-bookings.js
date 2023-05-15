'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {id: 1, spotId: 1, userId: 1, startDate: '12/10/2023', endDate: '12,15,2023'},
      {id: 2, spotId: 1, userId: 2, startDate: '12/20/2023', endDate: '01/01/2024'}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings')
  }
};
