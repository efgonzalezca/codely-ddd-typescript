import { User } from '../../../src/Users/domain/User';
import { UserCreatedDomainEvent } from '../../../src/Users/domain/UserCreatedDomainEvent';

export class UserCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    names,
    surnames,
    document,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    names: string;
    surnames: string;
    document: string;
    occurredOn?: Date;
  }): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId,
      eventId,
      names,
      surnames,
      document,
      occurredOn
    });
  }

  static fromUser(user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId: user.id.value,
      names: user.names.value,
      surnames: user.surnames.value,
      document: user.document.value,
    });
  }
}
