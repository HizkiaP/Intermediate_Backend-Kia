import express from "express";
import userController from "../controller/user_profile.controller.js";
import recipeController from "../controller/recipe.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import singleUpload from "../middleware/uploadImage.js";


const router = express.Router();

router.get("/user", verifyToken, userController.listUser);
router.get("/profile/:user_id", verifyToken, userController.getByUserId);
router.post("/user", singleUpload("image"), userController.createUser);
router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.put("/user/:user_id", singleUpload("image"), verifyToken, userController.updateUser);
router.delete("/user/:user_id", userController.deleteUser);

router.get("/recipe", recipeController.listRecipe);
router.get("/recipe/:user_id", verifyToken, recipeController.listRecipeByUserId);
router.get("/recipe/getbyid/:recipe_id", verifyToken, recipeController.listRecipeId);
router.get("/search", recipeController.searchBy);
router.post("/recipe", singleUpload("photo"), verifyToken, recipeController.createRecipe);
router.put("/recipe/:recipe_id", singleUpload("photo"), verifyToken, recipeController.updateRecipe);
router.delete("/recipe/:recipe_id", recipeController.deleteRecipe);


export default router;