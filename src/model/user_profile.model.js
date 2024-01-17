import db from "../config/db.js";

const userModel = {
    getAllUsers: () => {
        try {
            return db.query("SELECT * FROM user_profile");
        }

        catch (err) {
            console.log(err.message);
        }
    },

    postUsers: ({username, email, password, phonenumber, photo}) => {
        try {
            return db.query(`INSERT INTO user_profile (username, email, password, phonenumber, photo)
           VALUES ('${username}', '${email}', '${password}', '${phonenumber}', '${photo}')
           `);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    updateUsers: ({user_id, username, email, password, phonenumber, photo}) => {
        try {
            return db.query(`UPDATE user_profile SET username = '${username}',
            email = '${email}', password = '${password}', phonenumber = '${phonenumber}', photo = '${photo}'
            WHERE user_id = ${user_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    findId: (user_id) => {
        try {
            return db.query(`SELECT * FROM user_profile WHERE user_id = ${user_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    deleteusers: (user_id) => {
        try {
            return db.query(`DELETE FROM user_profile WHERE user_id = ${user_id}`);
        }

        catch (err) {
            console.log(err.message);
        }
    },

    postRegister: ({username, email, phonenumber, password}) => {
        try {
            return db.query(`INSERT INTO user_profile (username, email, phonenumber, password)
            VALUES ('${username}', '${email}', '${phonenumber}', '${password}')`);
        }

        catch (err){
            console.log(err.message);
        }
    },

    postLogin: (email) => {
        try{
            return db.query(`SELECT * FROM user_profile WHERE email = '${email}'`);
        }

        catch(err){
            console.log(err.message);
        }
    }
};

export default userModel;