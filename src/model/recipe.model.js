import db from "../config/db.js";

const recipeModel = {
    getAllRecipes: () => {
        try {
            return db.query("SELECT * FROM recipe");
        }

        catch (err) {
            console.log(err.message);
        }
    },

    getByTitle: (title) => {
        try{
            return db.query(`SELECT title = ${title} FROM recipe`);
        }

        catch(err){
            console.log(err.message);
        }
    },

    postRecipes: ({title, ingredients, photo, video}) => {
        try {
            return db.query(`INSERT INTO recipe (title, ingredients, photo, video)
           VALUES ('${title}', '${ingredients}', '${photo}', '${video}')
           `);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    updateRecipes: (recipe_id, title, ingredients, photo, video) => {
        try {
            return db.query(`UPDATE recipe SET title = '${title}',
            ingredients = '${ingredients}', photo = '${photo}', video = '${video}'
            WHERE recipe_id = ${recipe_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    findId: (recipe_id) => {
        try {
            return db.query(`SELECT * FROM recipe WHERE recipe_id = ${recipe_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    deleteRecipes: (recipe_id) => {
        try {
            return db.query(`DELETE FROM recipe WHERE recipe_id = ${recipe_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    }
};

export default recipeModel;