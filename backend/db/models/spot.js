'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId'}
      )
      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId'}
      )
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING
    }, 
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL 
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};