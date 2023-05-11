'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'Warriors2023@gmail.com',
        username: 'ILoveTheGSW',
        hashedPassword: bcrypt.hashSync('warriorswinning123'),
      },
      {
        email: 'MrBeastAssistant@yahoo.com',
        username: 'WinSomeGifts',
        hashedPassword: bcrypt.hashSync('Alwaysgiving')
      },
      {
        email: 'WeAreTheJusticeLeague@hotmail.com',
        username: 'JusticeLeagueFTW',
        hashedPassword: bcrypt.hashSync('bestSeries')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Users';
   const Op = Sequelize.Op;
   await queryInterface.bulkDelete(options, {
    username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
