import { UsersCounter } from '../../../src/UsersCounter/domain/UsersCounter';
import { UsersCounterIncrementedDomainEvent } from '../../../src/UsersCounter/domain/UsersCounterIncrementedDomainEvent';

export class UsersCounterIncrementedDomainEventMother {
  static fromUsersCounter(counter: UsersCounter): UsersCounterIncrementedDomainEvent {
    return new UsersCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value
    });
  }
}
