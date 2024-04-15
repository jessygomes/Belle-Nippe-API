const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Order_User extends Model {}

Order_User.init(
  {
    firstname_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress_client: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
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
