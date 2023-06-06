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
      name: "The Mega Mansion",
      description: "Truly a get away.",
      price: 350
    },
    {
      ownerId: 1,
      address: "600 Main St",
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
      address: "123 Marine St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.76523583,
      lng: 102.43303127,
      name: "Truest Home",
      description: "You won't get homesick.",
      price: 400
    },
    ,
    {
      ownerId: 1,
      address: "1200 48th ave",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 10.765358,
      lng: 100.4330327,
      name: "The Flat House",
      description: "Spacious and perfect for a perfect weekend.",
      price: 375
    },
    ,
    {
      ownerId: 1,
      address: "250 4th St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7653258,
      lng: -101.4330327,
      name: "The Grand",
      description: "Spectacular house for a large group.",
      price: 300
    },
    ,
    {
      ownerId: 2,
      address: "320 Lyell St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.76532158,
      lng: -102.43310327,
      name: "Vacation Spot",
      description: "Great choice for a vacation.",
      price: 295
    },
    ,
    {
      ownerId: 2,
      address: "392 Main St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 511.765358,
      lng: -12.4330327,
      name: "Brick House",
      description: "A very underrated choice.",
      price: 450
    },
    ,
    {
      ownerId: 1,
      address: "1500 48th ave ",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7653158,
      lng: -104.4330327,
      name: "The One",
      description: "This place will give you a weekend to remember!",
      price: 350
    },
    ,
    {
      ownerId: 2,
      address: "1233 Montgomery St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.76535218,
      lng: -1021.4330327,
      name: "The Green Home",
      description: "Perfect if you like old school.",
      price: 275
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    
    return queryInterface.bulkDelete(options)
  }
};