const { User } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json("Utilisateur non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createUser: async (req, res) => {
    try {
      const { nom, prenom, email, password, is_logged, role } = req.body;
      const user = await User.create({
        nom,
        prenom,
        email,
        password,
        is_logged,
        role,
      });
      res.status(201).json(user);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      const { nom, prenom } = req.body;
      if (user) {
        await user.update({ nom, prenom });
        res.status(200).json(user);
      } else {
        res.status(404).json("Utilisateur non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(204).json("Utilisateur supprimé");
      } else {
        res.status(404).json("Utilisateur non trouvé");
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = userController;
