import { User } from '../domain/User';
import { UserNames } from '../domain/UserNames';
import { UserSurnames } from '../domain/UserSurnames';
import { UserDocument } from '../domain/UserDocument';
import { CreateUserRequest } from './CreateUserRequest';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../shared/domain/Users/UserId';
import { EventBus } from '../../shared/domain/EventBus';

export class UserCreator {
  private readonly repository: UserRepository;
  private readonly eventBus: EventBus;

  constructor(repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(request: CreateUserRequest): Promise<void> {
    const user = User.create(
      new UserId(request.id),
      new UserNames(request.names),
      new UserSurnames(request.surnames),
      new UserDocument(request.document)
    );
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}