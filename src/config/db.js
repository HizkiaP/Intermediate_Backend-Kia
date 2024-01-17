import "dotenv/config";
import pg from "pg";

const db = new pg.Pool({
    host: process.env.VERCEL_HOST,
    user: process.env.VERCEL_USER,
    password: process.env.VERCEL_PASSWORD,
    database: process.env.VERCEL_DB,
    port: process.env.VERCEL_PORT
});

db.connect((err) => {
    if(err){
        console.log(err.message);
    }
});

export default db;
    
