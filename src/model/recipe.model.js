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

    searchByTitle: (keyword, sort, limit, offset) => {
        return new Promise ((resolve, reject)=>{
            let query = `SELECT * FROM recipe WHERE title ILIKE '%${keyword}%'`;
            if(sort){
                if(sort === "ASC" ){
                    query += "ORDER BY title ASC";
                } else if (sort === "DESC"){
                    query += "ORDER BY title DESC";
                }
            }
            if (limit) {
                query += ` LIMIT ${limit}`;
            }
            if (offset) {
                query += ` OFFSET ${offset}`;
            }
            db.query(query, (err, res)=>{
                if(err){
                    reject(err);
                    
                }
                resolve(res);
            });

        });
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

    updateRecipes: ({recipe_id, title, ingredients, photo, video}) => {
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