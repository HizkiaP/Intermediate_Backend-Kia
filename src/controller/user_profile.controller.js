import userModel from "../model/user_profile.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../helper/cloudinary.js";

const userController = {
  listUser: async (req, res) => {
    try {
      const result = await userModel.getAllUsers();
      res.status(200);
      res.json({
        message: "Get All User Success",
        data: result,
      });
    } catch (err) {
      console.log("Get All User Failed");
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email, password, phonenumber } = req.body;
      // console.log(req);
      // console.log("body ===========", req.body);
      // console.log("file ===========", req.file);
      let photo = await cloudinary.uploader.upload(req.file.path);
      const image = photo.url;
      console.log(image);
      bcrypt.hash(password, 10, async (err, hash) => {
        console.log(hash);
        if (!hash) {
          console.log(err.message);
        } else {
          const data = {
            username,
            email,
            phonenumber,
            password: hash,
            photo: image,
          };
          const result = await userModel.postUsers(data);
          // console.log(result);
          res.status(200);
          res.json({
            message: "Create User Success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const searchId = req.params.user_id;
      const { rowCount, rows } = await userModel.findId(searchId);
      if (!rowCount) {
        console.log("User Id Not Found");
      }

      const data = rows[0];
      console.log(data);

      try {
        const { user_id, username, email, password, phonenumber } = req.body;
        // console.log(req);
        // console.log(req.file);
        const photo = await cloudinary.uploader.upload(req.file.path);
        const image = photo.url;
        bcrypt.hash(password, 10, async (err, hash) => {
          if (!hash) {
            console.log("Error hash password");
          } else {
            const data = {
              user_id,
              username,
              email,
              password: hash,
              phonenumber,
              photo: image,
            };
            // console.log("image ========",data);
            const result = await userModel.updateUsers(data);
            res.status(200);
            res.json({
              message: "Update User Success",
              data: result,
            });
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (err) {
      console.log("Update User Failed");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await userModel.deleteusers(user_id);
      res.status(200);
      res.json({
        message: "Delete User Success",
        data: result,
      });
    } catch (err) {
      console.log("Delete User Failed");
    }
  },

  userRegister: async (req, res) => {
    try {
      const { username, email, phonenumber, password, confPassword } = req.body;
      if (password !== confPassword) {
        return res.status(401).json({
          message: "Password and Confirm Password Not Match",
        });
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (!hash) {
          console.log("Error hash password");
        } else {
          const data = {
            username,
            email,
            phonenumber,
            password: hash,
          };
          const result = await userModel.postRegister(data);
          console.log(result);
          res.status(200);
          res.json({
            message: "Register Success",
            data: result,
          });
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userModel.postLogin(email);
      console.log(result);
      if (!result.rows[0]) {
        return res.status(401).json({
          error: "Authentication Failed",
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed password" });
      }
      const token = jwt.sign(
        { user_id: result.rows[0].user_id, email: result.rows[0].email },
        process.env.VERCEL_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      const data = result;
      console.log(data);
      console.log(token);
      res.json({
        message: "Login Successful",
        token,
        data
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default userController;
