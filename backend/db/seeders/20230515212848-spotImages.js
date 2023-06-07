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
        url: "https://practicalhomes.com.au/wp-content/uploads/2019/06/Practical-Homes-36SQV1.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=",
        preview: true
      },
      {
        spotId: 5,
        url: "https://sometimes-homemade.com/wp-content/uploads/2016/02/exterior.png",
        preview: true
      },
      {
        spotId: 6,
        url: " https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmljZSUyMGhvdXNlfGVufDB8fDB8fHww&w=1000&q=80",
        preview: true
      },
      {
        spotId: 7,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXAqp00vigLN_ub0joYrElLDkz3OYk7bQLkkbzmSxwRqWNIjmydNbWO9JDD9LwXR71b4&usqp=CAU",
        preview: true
      },
      {
        spotId: 8,
        url: "https://media.istockphoto.com/id/1281554848/photo/dream-home-luxury-house-success-suburban-house.jpg?s=170667a&w=0&k=20&c=3iucZzHFZO_6k4Xth1nrqvs6lJSANgliiMUwMFy2nwA=",
        preview: true
      },
      {
        spotId: 9,
        url: "https://architecturebeast.com/wp-content/uploads/2014/09/Most_Beautiful_Houses_In_The_World_House_M_featured_on_architecture_beast_39.jpg",
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options)
  }
};