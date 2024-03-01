import recipeModel from "../model/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

const recipeController = {
  listRecipe: async (req, res) => {
    try {
      const result = await recipeModel.getAllRecipes();
      res.status(200);
      res.json({
        message: "Get All Recipe Success",
        data: result.rows,
      });
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  },

  searchBy: (req, res) => {
    const { keyword, sort, limit, offset } = req.query;
    // const search = keyword.toLowerCase();
    recipeModel
      .searchByTitle(keyword, sort, limit, offset)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  createRecipe: async (req, res) => {
    try {
      const { title, ingredients, video } = req.body;
      let photo = "";
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.url;
      }
      console.log("photo === ", photo);
      // const image = photo.url;
      // console.log("image === ", image);
      const data = {
        title,
        ingredients,
        photo,
        video,
      };
      console.log(data);
      const result = await recipeModel.postRecipes(data);
      res.status(200);
      res.json({
        message: "Create Recipe Success",
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  },

  updateRecipe: async (req, res) => {
    try {
      // const { rowCount, rows } = await recipeModel.findId(searchId);
      // if (!rowCount) {
      //   console.log("Recipe Id Not Found");
      // }

      // const data = rows[0];
      // console.log(data);

      try {
        const recipe_id = req.params.recipe_id;
        const { title, ingredients, video } = req.body;
        console.log("file = ", req.file);
        let photo = "";
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          photo = result.url;
        }
        // let photo = cloudinary.uploader.upload(req.file.path);
        // const image = photo.url;
        const data = {
          recipe_id,
          title,
          ingredients,
          photo,
          video,
        };
        const result = await recipeModel.updateRecipes(data);
        res.status(200);
        res.json({
          message: "Update Recipe Success",
          data: result,
        });
      } catch (error) {
        console.log(error.message);
      }
    } catch (err) {
      console.log("Update Recipe Failed");
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const { recipe_id } = req.params;
      const result = await recipeModel.deleteRecipes(recipe_id);
      res.status(200);
      res.json({
        message: "Delete Recipe Success",
        data: result,
      });
    } catch (err) {
      console.log("Delete Recipe Failed");
    }
  },
};

export default recipeController;
