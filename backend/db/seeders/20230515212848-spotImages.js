'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=1024x1024&w=is&k=20&c=t-C3iLfiSNYwsjNNW4WnojYsFcj3ty4wVb3PQUUOaBM=",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options)
  }
};