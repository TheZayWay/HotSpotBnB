'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'});   
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [5,25]
      // }
    }, 
    city: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [5,25]
      // }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [5,25]
      // }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [5,25]
      // }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
      // validate: {
      //   len: [5,25]
      // }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   len: [5,25]
      // }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
      // validate: {
      //   min: 1
      // }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};