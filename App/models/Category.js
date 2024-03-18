const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Category extends Model {}

Category.init(
  {
    name_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "category",
  }
);

module.exports = Category;
