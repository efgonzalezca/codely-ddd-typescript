import { DomainEvent } from '../../shared/domain/DomainEvent';

type CreateUserDomainEventAttributes = {
  readonly names: string;
  readonly surnames: string;
  readonly document: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';

  readonly names: string;
  readonly surnames: string;
  readonly document: string;

  constructor({
    aggregateId,
    names,
    surnames,
    document,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    names: string;
    surnames: string;
    document: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.names = names;
    this.surnames = surnames;
    this.document = document;
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { names, surnames, document } = this;
    return {
      names,
      surnames,
      document
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateUserDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      names: attributes.names,
      surnames: attributes.surnames,
      document: attributes.document,
      eventId,
      occurredOn
    });
  }
}
