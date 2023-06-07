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
      address: "120 25th ave",
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
      ownerId: 1,
      address: "400 Lyell St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7653258,
      lng: -102.4330327,
      name: "The Brick House",
      description: "An underrated vacation home",
      price: 250
    },
    {
      ownerId: 2,
      address: "50 30th ave",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7615358,
      lng: -102.413302327,
      name: "Grand Mansion",
      description: "The only place to stay for a stellar trip.",
      price: 400
    },
    {
      ownerId: 1,
      address: "545 Clayton St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7651358,
      lng: -12.4330327,
      name: "The Home",
      description: "Perfect for those looking for a homey vibe",
      price: 310
    },
    {
      ownerId: 1,
      address: "433 Bushwick st",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 51.765358,
      lng: -102.4330327,
      name: "The Flat Top",
      description: "Perfect for parties.",
      price: 350
    },
    {
      ownerId: 2,
      address: "390 Pierce St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 50.7653582,
      lng: -102.43303227,
      name: "Metropolis",
      description: "Fits large groups of people.",
      price: 500
    },
    {
      ownerId: 1,
      address: "300 Popper St",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 5.765358,
      lng: 902.4330327,
      name: "The Incognito",
      description: "Secluded. One of one.",
      price: 400
    },
    {
      ownerId: 1,
      address: "40 Beacon st",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 30.765358,
      lng: 42.4330327,
      name: "The Spot",
      description: "Luxurious",
      price: 450
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    
    return queryInterface.bulkDelete(options)
  }
};