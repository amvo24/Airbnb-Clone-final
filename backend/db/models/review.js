'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here k
      Review.belongsTo(models.User, {foreignKey: 'userId'});
      // Review.belongsTo(models.User, {foreignKey: 'firstName'});
      // Review.belongsTo(models.User, {foreignKey: 'lastName'});
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Review.hasMany(models.Image, {foreignKey: 'reviewId', as: 'images', onDelete: 'CASCADE'});

    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    //if need be delete firstName and lastname below
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
