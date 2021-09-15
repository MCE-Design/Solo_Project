'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Spot.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(9,7),
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
