import knex from 'knex';
import log from './logger';
import databaseConfig from '../../config/knexfile';
import { Model } from 'objection';


async function connect() {
    const environment = process.env.NODE_ENV || 'development';
    const dbConfig = databaseConfig[environment];
    const knexInstance = knex(dbConfig);
  
    try { 
      Model.knex(knexInstance);
      log.info('DB connected');
    } catch (error) {
      log.error('Could not connect to db');
      process.exit(1);
    }
  }
  
  export default connect;