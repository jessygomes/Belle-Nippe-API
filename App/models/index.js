const User = require("./User");
const Image = require("./Image");
const Order_User = require("./Order_User");
const Item = require("./Item");
const Cart = require("./Cart");
const Cart_Item = require("./Cart_Item");
const Order_Detail = require("./Order_Detail");
const Collection = require("./Collection");
const Category = require("./Category");

//! User & Order_User
User.hasMany(Order_User, {
  foreignKey: "user_id",
  as: "orders",
});

Order_User.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//! User & Cart
User.hasOne(Cart, {
  foreignKey: "user_id",
  as: "cart",
});

Cart.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//! Order_User & Order_Detail
Order_User.hasMany(Order_Detail, {
  foreignKey: "order_id",
  as: "order_details",
});

Order_Detail.belongsTo(Order_User, {
  foreignKey: "order_id",
  as: "order",
});

//! Cart & Cart_Item
Cart.hasMany(Cart_Item, {
  foreignKey: "cart_id",
  as: "cart_items",
});

Cart_Item.belongsTo(Cart, {
  foreignKey: "cart_id",
  as: "cart",
});

//! Item & Cart_Item
// Un article peut être dans plusieurs paniers
Item.hasMany(Cart_Item, {
  foreignKey: "item_id",
  as: "cart_items",
});

Cart_Item.belongsTo(Item, {
  foreignKey: "item_id",
  as: "item",
});

//! Item & Order_Detail
// Un article peut être dans plusieurs commandes
Item.hasMany(Order_Detail, {
  foreignKey: "item_id",
  as: "order_details",
});

Order_Detail.belongsTo(Item, {
  foreignKey: "item_id",
  as: "item",
});

//! Collection & Item
Collection.hasMany(Item, {
  foreignKey: "collection_id",
  as: "items",
});

Item.belongsTo(Collection, {
  foreignKey: "collection_id",
  as: "collection",
});

//! Category & Item
Category.hasMany(Item, {
  foreignKey: "category_id",
  as: "items",
});

Item.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

//! Image & Item
Item.belongsToMany(Image, {
  through: "item_has_image",
  foreignKey: "item_id",
  otherKey: "image_id",
  as: "images",
});

Image.belongsToMany(Item, {
  through: "item_has_image",
  foreignKey: "image_id",
  otherKey: "item_id",
  as: "items",
});

module.exports = {
  User,
  Image,
  Order_User,
  Item,
  Cart,
  Cart_Item,
  Order_Detail,
  Collection,
  Category,
};
