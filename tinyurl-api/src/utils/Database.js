import { Client } from 'pg';
import config from '../config/development';

export default class Database {
  async sendQuery(query, params) {
    try {
      const client = new Client({
        user: config.pgUser,
        host: config.pgHost,
        database: config.pgDatabase,
        port: config.pgPort,
        password: config.pgPassword,
      });
      await client.connect();
      const response = await client.query(query, params);
      await client.end();
      return response;
    } catch (error) {
      console.log('Error occured!', error);
    }
  }

  async getById(hashkey) {
    try {
      const query = `SELECT * FROM url_system.url_hash where hashkey = $1`;
      const params = [hashkey];
      const response = await this.sendQuery(query, params);
      return response.rows[0];
    } catch (error) {
      console.log('Error in fetching by hashkey, ', error);
      throw error;
    }
  }

  async insert(urlModel) {
    try {
      const query = `INSERT INTO url_system.url_hash (long_url, hashkey, short_url)
                    VALUES ($1, $2, $3)`;
      const params = [
        urlModel.longUrl,
        urlModel.hashKey,
        urlModel.shortUrl
      ];
      const response = await this.sendQuery(query, params);
      return urlModel;
    } catch (error) {
      console.log('Error in insertion, ', error);
      throw error;
    }
  }
}
