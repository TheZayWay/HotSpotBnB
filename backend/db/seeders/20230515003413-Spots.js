'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 25th ave",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Mega Mansion",
      description: "Truly a get away.",
      price: 350
    },
    {
      ownerId: 1,
      address: "123 Main St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.765358,
      lng: -102.4330327,
      name: "The Modern Home",
      description: "Relaxation purposes only.",
      price: 300
    },
    {
      ownerId: 2,
      address: "123 Main St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.765358,
      lng: -102.4330327,
      name: "The Modern Home",
      description: "Relaxation purposes only.",
      price: 300
    },
    {
      ownerId: 2,
      address: "123 Main St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.765358,
      lng: -102.4330327,
      name: "The Modern Home",
      description: "Relaxation purposes only.",
      price: 300
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    
    return queryInterface.bulkDelete(options)
  }
};