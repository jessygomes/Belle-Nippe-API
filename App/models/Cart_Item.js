const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Cart_Item extends Model {}

Cart_Item.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "cart_item",
  }
);

module.exports = Cart_Item;
