import { ContainerBuilder } from 'node-dependency-injection';

import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class DomainEventSubscribers {
  public items: Array<DomainEventSubscriber<DomainEvent>>;

  private constructor(items: Array<DomainEventSubscriber<DomainEvent>>) {
    this.items = items;
  }

  static from(container: ContainerBuilder): DomainEventSubscribers {
    const subscriberDefinitions  = [];
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    for(const serviceId of container.findTaggedServiceIds('domainEventSubscriber')) {
      subscriberDefinitions.push(serviceId.id)
    }

    subscriberDefinitions.forEach((key, _definition) => {
      const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return new DomainEventSubscribers(subscribers);
  }
}
