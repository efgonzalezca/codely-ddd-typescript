import { ContainerBuilder } from 'node-dependency-injection';

import { UserPutController } from '../controllers/users';
import StatusGetController from '../controllers/StatusGetController';
import { UsersCounterGetController } from '../controllers/usersCounter';

import { MongoUserRepository } from '../../Users/infrastructure/persistence/MongoUserRepository';
import { MongoConfigFactory } from '../../shared/infrastructure/persistence/mongo/MongoConfigFactory';
import { MongoClientFactory } from '../../shared/infrastructure/persistence/mongo/MongoClientFactory';
import { InMemoryAsyncEventBus } from '../../shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import { MongoUsersCounterRepository } from '../../UsersCounter/infrastructure/persistence/mongo/MongoUsersCounterRepository';

import { UserCreator } from '../../Users/application/UserCreator';
import { UsersCounterFinder } from '../../UsersCounter/application/Find/UsersCounterFinder';
import { UsersCounterIncrementer } from '../../UsersCounter/application/Increment/UsersCounterIncrementer';
import { IncrementUsersCounterOnUserCreated } from '../../UsersCounter/application/Increment/IncrementUsersCounterOnUserCreated';

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
  .register('app.EventBus', InMemoryAsyncEventBus)
  
container
  .register('usersCounter.domain.UsersCounterRepository', MongoUsersCounterRepository)
  .addArgument(container.get('app.ConnectionManager'))

container
  .register('users.domain.UserRepository', MongoUserRepository)
  .addArgument(container.get('app.ConnectionManager'))

container
  .register('usersCounter.application.UsersCounterIncrementer', UsersCounterIncrementer)
  .addArgument(container.get('usersCounter.domain.UsersCounterRepository'))
  .addArgument(container.get('app.EventBus'))

container
  .register('usersCounter.application.IncrementUsersCounterOnUserCreated', IncrementUsersCounterOnUserCreated)
  .addArgument(container.get('usersCounter.application.UsersCounterIncrementer'))
  .addTag('domainEventSubscriber')

container
  .register('usersCounter.application.UsersCounterFinder', UsersCounterFinder)
  .addArgument(container.get('usersCounter.domain.UsersCounterRepository'))

container
  .register('api.controllers.usersCounter.UsersCounterGetController', UsersCounterGetController)
  .addArgument(container.get('usersCounter.application.UsersCounterFinder'))

container
  .register('users.application.UserCreator', UserCreator)
  .addArgument(container.get('users.domain.UserRepository'))
  .addArgument(container.get('app.EventBus'))
  
container
  .register('api.controllers.users.UserPutController', UserPutController)
  .addArgument(container.get('users.application.UserCreator'))

container.register('app.EnvironmentArranger', MongoEnvironmentArranger)
  .addArgument(container.get('app.ConnectionManager'))

export default container;