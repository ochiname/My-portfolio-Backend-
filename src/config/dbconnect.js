import Knex from "knex";
import dbConfig from "./environment.js";  // Assuming this has the environmentStage
import knexfile from "../../knexfile.js";  // Correct path to knexfile

// Get the environment from dbConfig
const environment = dbConfig.environmentStage;  // e.g., 'development'

// Get the configuration based on the environment
const option = knexfile[environment];  // This will fetch the correct settings

// Initialize knex with the appropriate option
export const knex = Knex(option);

// Database connection check function
export const dbconnect = async () => {
  try {
    await knex.raw('SELECT 1+1 AS result');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed', error);
  }
}; 