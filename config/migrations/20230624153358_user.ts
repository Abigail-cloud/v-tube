import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('user_name', 50).notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('password', 100).notNullable();
    table.bigInteger('phone_number');
    table.string('subscribers');
    table.jsonb('subscribed_users');
    table.string('img');
    table.boolean('from_google').defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user');
}
