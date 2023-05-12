'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'Warriors2023@gmail.com',
        username: 'ILoveTheGSW',
        hashedPassword: bcrypt.hashSync('warriorswinning123'),
        firstName: 'Tommy',
        lastName: 'Bobby'
      },
      {
        email: 'MrBeastAssistant@yahoo.com',
        username: 'WinSomeGifts',
        hashedPassword: bcrypt.hashSync('Alwaysgiving'),
        firstName: 'Jim',
        lastName: 'Carry'
      },
      {
        email: 'WeAreTheJusticeLeague@hotmail.com',
        username: 'JusticeLeagueFTW',
        hashedPassword: bcrypt.hashSync('bestSeries'),
        firstName: 'Dennis',
        lastName: 'Whipple'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['ILoveTheGSW','WinSomeGifts','JusticeLeagueFTW'] }
    }, {});
  }
};
