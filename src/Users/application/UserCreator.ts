import { User } from '../domain/User';
import { UserNames } from '../domain/UserNames';
import { UserSurnames } from '../domain/UserSurnames';
import { UserDocument } from '../domain/UserDocument';
import { CreateUserRequest } from './CreateUserRequest';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../shared/domain/Users/UserId';

export class UserCreator {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(request: CreateUserRequest): Promise<void> {
    const user = new User(
      new UserId(request.id),
      new UserNames(request.names),
      new UserSurnames(request.surnames),
      new UserDocument(request.document)
    );
    return this.repository.save(user);
  }
}