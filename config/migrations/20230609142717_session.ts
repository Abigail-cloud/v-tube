import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("users.id").onDelete("CASCADE");
    table.boolean("valid").defaultTo(true);
    table.string("userAgent");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sessions");
}


