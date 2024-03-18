const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Collection extends Model {}

Collection.init(
  {
    title_collection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_collection: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "collection",
  }
);

module.exports = Collection;
