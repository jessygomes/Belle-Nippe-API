const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Cart extends Model {}

Cart.init(
  {
    total: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "cart",
  }
);

module.exports = Cart;
