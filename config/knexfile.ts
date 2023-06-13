import path from 'path';
import { knexSnakeCaseMappers } from 'objection';
import { env } from './environment';
import config from 'config';

// const dbHost = config.get<string>('dbHost');
// const dbUsername = config.get<string>('dbUsername');
// const dbPassword = config.get<string>('dbPassword');
// const dbName = config.get<string>('dbName');

const databaseConfig: { [key: string]: import("knex").Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './migrations')
  },
  seeds: {
    directory: path.join(__dirname, './seeds')
  },
...knexSnakeCaseMappers,
  },
  production: {
    client: 'pg',
    connection: {
     
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './migrations')
  },
  seeds: {
    directory: __dirname +  './seeds'
  },
...knexSnakeCaseMappers,
  },
};
// ./../../migrations

export default databaseConfig