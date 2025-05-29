// Update with your config settings.

/** nmp install express cors jsonwebtoken helmet pg knex dotenv joi uuid bcrypt morgan
 * @type { Object.<string, import("knex").Knex.Config> }
 */
/** nmp install express cors jsonwebtoken helmet pg knex dotenv joi uuid bcrypt morgan
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  staging: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // ✅ SSL inside connection
    }, 
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,        // 30 seconds idle timeout
      acquireTimeoutMillis: 10000,     // 10 seconds to acquire a connection
      reapIntervalMillis: 1000,        // 1 second to check for stale connections
      createRetryIntervalMillis: 200,  // Retry every 200ms for failed connections
    },
    migrations: { directory: "./src/db/migrations" },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // ✅ SSL inside connection
    },
    pool: {
      min: 2,
      max: 20,                         // Higher pool max for production load
      idleTimeoutMillis: 30000,        // 30 seconds idle timeout
      acquireTimeoutMillis: 10000,     // 10 seconds to acquire a connection
      reapIntervalMillis: 1000,        // 1 second to check for stale connections
      createRetryIntervalMillis: 200,  // Retry every 200ms for failed connections
    },
    migrations: { directory: "./src/db/migrations" },
  }
};
