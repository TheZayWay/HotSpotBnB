'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
    }
  }
  SpotImage.init({
    url: {
      type: DataTypes.STRING
    }, 
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};