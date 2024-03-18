const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Image extends Model {}

Image.init(
  {
    name_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "image",
  }
);

module.exports = Image;
