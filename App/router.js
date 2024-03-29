const express = require("express");
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const collectionController = require("./controllers/collectionController");
const itemController = require("./controllers/itemController");
const cartController = require("./controllers/cartController");
const cartItemController = require("./controllers/cartItemController");
const orderUserController = require("./controllers/orderUserController");
const orderDetailController = require("./controllers/orderDetailController");
const authController = require("./controllers/authController");
const upload = require("./middlewares/multerMiddleware");
const jwtMiddleware = require("./middlewares/jwtMiddleware");
const isAdmin = require("./middlewares/isAdmin");

const router = express.Router();

//! AUTH ROUTES
router.post("/login", authController.login);
router.post("/register", authController.register);

//! USERS ROUTES
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getOneUser);
router.post("/users", userController.createUser);
router.patch("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

//! CATEGORIES ROUTES
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getOneCategory);
router.get("/categories/:id/items", categoryController.getItemsOfCategory);
router.post(
  "/categories",
  isAdmin,
  jwtMiddleware,
  categoryController.createCategory
);
router.delete(
  "/categories/:id",
  isAdmin,
  jwtMiddleware,
  categoryController.deleteCategory
);

//! COLLECTIONS ROUTES
router.get("/collections", collectionController.getAllCollections);
router.get("/collections/:id", collectionController.getOneCollection);
router.get("/collections/:id/items", collectionController.getItemOfCollection);
router.post(
  "/collections",
  isAdmin,
  jwtMiddleware,
  collectionController.createCollection
);
router.patch(
  "/collections/:id",
  isAdmin,
  jwtMiddleware,
  collectionController.updateCollection
);
router.delete(
  "/collections/:id",
  isAdmin,
  jwtMiddleware,
  collectionController.deleteCollection
);

//! ITEMS ROUTES
router.get("/items", itemController.getAllItems);
router.get("/items/:id", itemController.getOneItem);
router.get("/collections/:id/items", itemController.getItemsOfCollection);
router.get("/items/:id/categories", itemController.getItemOfCategory);
router.post(
  "/items",
  isAdmin,
  jwtMiddleware,
  upload.array("images"),
  itemController.createItem
);
router.patch(
  "/items/:id",
  isAdmin,
  jwtMiddleware,
  upload.array("images"),
  itemController.updateItem
);
router.delete("/items/:id", isAdmin, jwtMiddleware, itemController.deleteItem);

//! ITEM IMAGES ROUTES
router.get("/items/:itemId/images", itemController.getImagesOfItem);
router.post(
  "/items/:itemId/images",
  upload.single("image"),
  itemController.addImageToItem
);
router.delete(
  "/items/:itemId/images/:imageId",
  itemController.deleteImageOfItem
);

//! CARTS ROUTES
router.get("/carts", cartController.getAllCarts);
router.get("/carts/:id", cartController.getOneCart);
router.get("/carts/:id/cart_items", cartController.getOneCartWithCartItems);
router.post("/carts", cartController.createCart);
router.patch("/carts/:id", cartController.updateCart);
router.delete("/carts/:id", cartController.deleteCart);

//! CART_ITEMS ROUTES
router.get("/cart_items", cartItemController.getAllCartItems);
router.get("/cart_items/:id", cartItemController.getOneCartItem);
router.post("/cart_items", cartItemController.createCartItem);
router.patch("/cart_items/:id", cartItemController.updateCartItem);
router.delete("/cart_items/:id", cartItemController.deleteCartItem);

//! ORDER_USER ROUTES
router.get("/orders", orderUserController.getAllOrderUsers);
router.get("/orders/:id", orderUserController.getOneOrderUser);
router.get("/users/:id/orders", orderUserController.getOrdersAndDetailsOfUser);
router.get(
  "/orders/:id/order_details",
  orderUserController.getOneOrderUserWithOrderDetail
);
router.get("/ordersAndDetails", orderUserController.getAllOrdersWithDetails);
router.post("/orders", orderUserController.createOrderUser);
router.patch(
  "/orders/:id",
  isAdmin,
  jwtMiddleware,
  orderUserController.updateOrderUser
);
router.delete(
  "/orders/:id",
  isAdmin,
  jwtMiddleware,
  orderUserController.deleteOrderUser
);

//! ORDER_DETAIL ROUTES
router.get("/order_details", orderDetailController.getAllOrderDetails);
router.get("/order_details/:id", orderDetailController.getOneOrderDetail);
router.post("/order_details", orderDetailController.createOrderDetail);
router.patch(
  "/order_details/:id",
  isAdmin,
  jwtMiddleware,
  orderDetailController.updateOrderDetail
);
router.delete(
  "/order_details/:id",
  isAdmin,
  jwtMiddleware,
  orderDetailController.deleteOrderDetail
);

module.exports = router;
