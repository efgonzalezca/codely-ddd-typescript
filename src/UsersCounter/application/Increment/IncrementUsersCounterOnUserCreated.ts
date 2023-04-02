import { UserId } from '../../../shared/domain/Users/UserId';
import { UsersCounterIncrementer } from './UsersCounterIncrementer';
import { DomainEventClass } from '../../../shared/domain/DomainEvent';
import { UserCreatedDomainEvent } from '../../../Users/domain/UserCreatedDomainEvent';
import { DomainEventSubscriber } from '../../../shared/domain/DomainEventSubscriber';

export class IncrementUsersCounterOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  private incrementer: UsersCounterIncrementer;

  constructor(incrementer: UsersCounterIncrementer) {
    this.incrementer = incrementer;
  }

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent) {
    await this.incrementer.run(new UserId(domainEvent.aggregateId));
  }
}
