export default {
  api: {
    prefix: '/api/v1',
  },
  logFile: process.env.LOG_FILE || `${ __dirname }/../../logs/debug.log`,
  port: process.env.PORT || '4500',
  dependencyInjectionPath: process.env.INJECTION_PATH || `${ __dirname }/../../api/dependency-injection`,
  rootPath: process.env.ROOT_PATH || `${ __dirname }/../../../src`
}