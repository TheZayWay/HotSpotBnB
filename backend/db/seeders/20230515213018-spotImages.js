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
      // {
      //   spotId: 3,
      //   url: "https://sometimes-homemade.com/wp-content/uploads/2016/02/exterior.png",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 4,
      //   url: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmljZSUyMGhvdXNlfGVufDB8fDB8fHww&w=1000&q=80",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 5,
      //   url: "https://insidecolumbia.net/wp-content/uploads/2019/11/Exterior-Photos-3-copy_featuredImage.jpg",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 6,
      //   url: "https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 7,
      //   url: "https://practicalhomes.com.au/wp-content/uploads/2019/06/Practical-Homes-36SQV1.jpg",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 8,
      //   url: "https://maisonsinhaus.fr/wp-content/uploads/2021/12/modular-house-nice-pool-1024x576.jpg",
      //   preview: true
      // },
      // ,
      // {
      //   spotId: 9,
      //   url: "https://live.staticflickr.com/5034/7058664963_e579b757ae_b.jpg",
      //   preview: true
      // }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options)
  }
};