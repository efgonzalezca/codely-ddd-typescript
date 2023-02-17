import container from '../../api/dependency-injection';

import { User } from '../domain/User';
import { UserNames } from '../domain/UserNames';
import { UserSurnames } from '../domain/UserSurnames';
import { UserDocument } from '../domain/UserDocument';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../shared/config/domain/Users/UserId';
import { CreateUserRequest } from './CreateUserRequest';

export class UserCreator {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    if(typeof repository === 'string') {
      this.repository = container.get('users.domain.UserRepository');
    } else {
      this.repository = repository;
    }
  }

  async run(request: CreateUserRequest): Promise<void> {
    const user = new User({ 
      id: new UserId(request.id),
      names: new UserNames(request.names),
      surnames: new UserSurnames(request.surnames),
      document: new UserDocument(request.document)
    });
    return this.repository.save(user);
  }
}