// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        debug: true,
        connection: {
            filename: "./dev.sqlite3",
        },
        migrations: {
            directory: "./data/migrations",
        },
        ssl: true,
        useNullAsDefault: true,
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
            },
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            // database: process.env.DB,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./data/migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            // database: process.env.DB,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./data/migrations",
        },
    },
};
