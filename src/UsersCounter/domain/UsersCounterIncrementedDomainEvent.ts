import { DomainEvent } from '../../shared/domain/DomainEvent';

type UsersCounterIncrementedAttributes = { total: number };

export class UsersCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'usersCounter.incremented';
  readonly total: number;

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: UsersCounterIncrementedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.total = data.total;
  }

  toPrimitives() {
    return {
      total: this.total,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UsersCounterIncrementedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new UsersCounterIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn
    });
  }
}
