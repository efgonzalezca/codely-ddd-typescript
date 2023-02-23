import convict from 'convict';

const appConfig = convict({
  api: {
    prefix: {
      doc: 'The file path',
      format: String,
      env: 'API_PREFIX',
      default: '/api/v1'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4500,
    env: 'PORT',
    arg: 'port'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017'
    },
    name:{
      doc: 'The Mongo database name',
      format: String,
      env: 'MONGO_DB_NAME',
      default: 'app-dev'
    }
  },
  logs: {
    file: {
      doc: 'The file path',
      format: String,
      env: 'LOG_FILE',
      default: `${ __dirname }/../../logs/debug.log`
    },
  }
});

appConfig.loadFile([__dirname + '/default.json', __dirname + '/' + appConfig.get('env') + '.json']);

export default appConfig;
