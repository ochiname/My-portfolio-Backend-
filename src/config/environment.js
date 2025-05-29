import env from "dotenv";

env.config();

const dbConfig = {  
    db_url: process.env.DATABASE_URL,
    api: process.env.API_KEY,
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     jwtsecret: process.env.JWT_SECRET,
     port: process.env.PORT,
     environmentStage: process.env.NODE_ENV
   };
 
 export default dbConfig;