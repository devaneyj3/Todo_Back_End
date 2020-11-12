exports.up = function (knex) {
    return knex.schema.createTable("todos", (tbl) => {
        tbl.increments();
        tbl.text("name").unique().notNullable();
        tbl.text("created_at");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableifExists("todos");
};
