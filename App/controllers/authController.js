require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const schema = require("../models/PasswordPolicy");
const nodemailer = require("nodemailer");
const { User } = require("../models");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json("Veuillez renseigner email et mot de passe");
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json("User Introuvable");
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json("Mot de passe incorrect / Email Incorrect");
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: "2h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({
        token,
        id: user.id,
        is_logged: true,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  register: async (req, res) => {
    try {
      const { nom, prenom, email, password } = req.body;
      console.log(req.body);
      if (!email || !password || !nom || !prenom) {
        return res.status(400).json("Veuillez remplir tous les champs");
      }
      if (!emailValidator.validate(email)) {
        return res.status(400).json("L'email est invalide");
      }
      if (!schema.validate(password)) {
        return res
          .status(400)
          .json(
            "Le mot de passe doit contenir au moins Une Majuscule, un chiffre, un caractère spécial et doit faire au moins 8 caractères."
          );
      }
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(409).json("Cette email est déjà utilisé");
      }
      const hash = bcrypt.hashSync(password, 10);

      const newUser = await User.create({ nom, prenom, email, password: hash });

      const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
        expiresIn: "2h",
      });

      newUser.is_logged = true;

      res.cookie("token", token, { httpOnly: true });

      res.status(201).json({
        user: newUser,
        token,
        message: "Valide",
      });
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  //! REINITIALISATION DE MOT DE PASSE
  resetPasswordRequest: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json("User Introuvable");
      }
      const resetCode = Math.floor(100000 + Math.random() * 900000); //! CODE A 6 CHIFFRES
      user.resetCode = resetCode;
      await user.save();

      //! ENVOI DU CODE PAR MAIL
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        text: `Votre code de réinitialisation est : ${resetCode}`,
      };
      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json(
          "Un code de réinitialisation a été envoyé à votre adresse e-mail."
        );
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  verifyResetCode: async (req, res) => {
    try {
      const { email, resetCode } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || user.resetCode !== resetCode) {
        return res.status(400).json("Code de réinitialisation incorrect.");
      }
      res
        .status(200)
        .json(
          "Code de réinitialisation vérifié. Vous pouvez maintenant réinitialiser votre mot de passe."
        );
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, resetCode, newPassword } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || user.resetCode !== resetCode) {
        return res.status(400).json("Code de réinitialisation incorrect.");
      }
      user.password = bcrypt.hashSync(newPassword, 10);
      user.resetCode = null;
      await user.save();
      res
        .status(200)
        .json("Votre mot de passe a été réinitialisé avec succès.");
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = authController;
