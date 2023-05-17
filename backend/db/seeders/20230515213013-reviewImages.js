'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(options,[
      {reviewId: 1, url: "img url"},
      {reviewId: 2, url: "img url"}
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return await queryInterface.bulkDelete(options)
  }
};