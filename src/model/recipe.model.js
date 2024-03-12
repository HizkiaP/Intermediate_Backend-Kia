import db from "../config/db.js";

const recipeModel = {
  getAllRecipes: () => {
    try {
      return db.query("SELECT * FROM recipe");
    } catch (err) {
      console.log(err.message);
    }
  },

  searchByTitle: (keyword, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM recipe WHERE title ILIKE '%${keyword}%'`;
      if (sort) {
        if (sort === "ASC") {
          query += "ORDER BY title ASC";
        } else if (sort === "DESC") {
          query += "ORDER BY title DESC";
        }
      }
      if (limit) {
        query += ` LIMIT ${limit}`;
      }
      if (offset) {
        query += ` OFFSET ${offset}`;
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  postRecipes: ({ title, ingredients, photo, video, created_at, user_id }) => {
    try {
      return db.query(`INSERT INTO recipe (title, ingredients, photo, video, created_at, user_id)
           VALUES ('${title}', '${ingredients}', '${photo}', '${video}', '${created_at}', '${user_id}')
           `);
    } catch (err) {
      console.log(err.message);
    }
  },

  updateRecipes: ({
    recipe_id,
    title,
    ingredients,
    photo,
    video,
    updated_at,
  }) => {
    try {
      console.log("photo = ", photo);
      return db.query(`UPDATE recipe SET title = '${title}',
            ingredients = '${ingredients}', photo = '${photo}', video = '${video}', updated_at = '${updated_at}'
            WHERE recipe_id = ${recipe_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  findId: (recipe_id) => {
    try {
      return db.query(`SELECT * FROM recipe WHERE recipe_id = ${recipe_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteRecipes: (recipe_id) => {
    try {
      return db.query(`DELETE FROM recipe WHERE recipe_id = ${recipe_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  getRecipeByUserId: (user_id) => {
    try {
      // return db.query(
      //   "SELECT * FROM recipe JOIN user_profile ON recipe.user_id = user_profile.user_id"
      // );
      return db.query(`SELECT * FROM recipe WHERE user_id = ${user_id}`);
    } catch (error) {
      console.log(error.message);
    }
  },

  getRecipeId: (recipe_id) => {
    try {
      const query = `SELECT * FROM recipe JOIN user_profile ON recipe.user_id = user_profile.user_id WHERE recipe.recipe_id =${recipe_id}`;
      console.log("QUERY = ", query);
      return db.query(query);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
};

export default recipeModel;
