import { UsersCounter } from '../../domain/UsersCounter';
import { UserId } from '../../../shared/domain/Users/UserId';
import { UsersCounterId } from '../../domain/UsersCounterId';
import { EventBus } from '../../../shared/domain/EventBus';
import { UsersCounterRepository } from '../../domain/UsersCounterRepository';

export class UsersCounterIncrementer {
  private repository: UsersCounterRepository;
  private bus: EventBus;

  constructor(repository: UsersCounterRepository, bus: EventBus) {
    this.repository = repository;
    this.bus = bus;
  }

  async run(userId: UserId) {
    const counter = (await this.repository.search()) || this.initializeCounter();

    if (!counter.hasIncremented(userId)) {
      counter.increment(userId);

      await this.repository.save(counter);
      await this.bus.publish(counter.pullDomainEvents());
    }
  }

  private initializeCounter(): UsersCounter {
    return UsersCounter.initialize(UsersCounterId.random());
  }
}