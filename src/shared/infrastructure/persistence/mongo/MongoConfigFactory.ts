import config from '../../config';
import MongoConfig from './MongoConfig';

const mongoConfig = {
  url: config.get('mongo.url'),
  name: config.get('mongo.name')
};

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return mongoConfig;
  }
}
