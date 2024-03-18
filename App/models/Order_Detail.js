const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Order_Detail extends Model {}

Order_Detail.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_detail",
  }
);

module.exports = Order_Detail;
