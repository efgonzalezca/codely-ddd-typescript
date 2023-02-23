import { ContainerBuilder } from 'node-dependency-injection';

import { UserPutController } from '../controllers/users';
import { UserCreator } from '../../Users/application/UserCreator';
import StatusGetController from '../controllers/StatusGetController';
import { MongoUserRepository } from '../../Users/infrastructure/persistence/MongoUserRepository';
import { MongoConfigFactory } from '../../shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoClientFactory } from '../../shared/infrastructure/persistence/mongo/MongoClientFactory';

import { MongoEnvironmentArranger } from '../../../tests/shared/infrastructure/mongo/MongoEnvironmentArranger';

const container = new ContainerBuilder();

container
  .register('api.controllers.StatusGetController', StatusGetController)
  
container
  .register('app.MongoConfig')
  .setFactory(MongoConfigFactory, 'createConfig')

container
  .register('app.ConnectionManager')
  .addArgument('app')
  .addArgument(container.get('app.MongoConfig'))
  .setFactory(MongoClientFactory, 'createClient')

container
  .register('users.domain.UserRepository', MongoUserRepository)
  .addArgument(container.get('app.ConnectionManager'))

container
  .register('users.application.UserCreator', UserCreator)
  .addArgument(container.get('users.domain.UserRepository'))
  
container
  .register('api.controllers.users.UserPutController', UserPutController)
  .addArgument(container.get('users.application.UserCreator'))

container.register('app.EnvironmentArranger', MongoEnvironmentArranger)
  .addArgument(container.get('app.ConnectionManager'))

export default container;