import container from '../../api/dependency-injection';

import { User } from '../domain/User';
import { UserNames } from '../domain/UserNames';
import { UserSurnames } from '../domain/UserSurnames';
import { UserDocument } from '../domain/UserDocument';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../shared/config/domain/Users/UserId';

export class UserCreator {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    if(typeof repository === 'string') {
      this.repository = container.get('users.domain.UserRepository');
    } else {
      this.repository = repository;
    }
  }

  async run(id: UserId, names: UserNames, surnames: UserSurnames, document: UserDocument): Promise<void> {
    const user = new User(id, names, surnames, document);
    return this.repository.save(user);
  }
}