'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(
        models.ReviewImage,
        {foreignKey: 'reviewId'}
      )
      Review.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
      Review.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      )
    }
  }
  Review.init({
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER
    } 
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};