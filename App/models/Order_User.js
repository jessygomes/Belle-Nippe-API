const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Order_User extends Model {}

Order_User.init(
  {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order_user",
  }
);

module.exports = Order_User;
