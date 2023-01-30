import { ContainerBuilder } from 'node-dependency-injection';

import { UserPutController } from '../controllers/users';
import { UserCreator } from '../../Users/application/UserCreator';
import StatusGetController from '../controllers/StatusGetController';
import { FileUserRepository } from '../../Users/infrastructure/persistence/FileUserRepository';

const container = new ContainerBuilder();

container.register('api.controllers.StatusGetController', StatusGetController);
container
  .register('api.controllers.users.UserPutController', UserPutController)
  .addArgument('users.application.UserCreator')

container
  .register('users.application.UserCreator', UserCreator)
  .addArgument('users.domain.UserRepository')
container.register('users.domain.UserRepository', FileUserRepository);

export default container;
