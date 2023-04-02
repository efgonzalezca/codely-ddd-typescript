import { UsersCounter } from '../../domain/UsersCounter';
import { UsersCounterId } from '../../domain/UsersCounterId';
import { UsersCounterTotal } from '../../domain/UsersCounterTotal';
import { UsersCounterRepository } from '../../domain/UsersCounterRepository';

export class InMemoryUsersCounterRepository implements UsersCounterRepository {
  private counter: UsersCounter;
  constructor() {
    this.counter = new UsersCounter(UsersCounterId.random(), new UsersCounterTotal(0), []);
  }

  async search(): Promise<UsersCounter> {
    return this.counter;
  }

  async save(counter: UsersCounter): Promise<void> {
    this.counter = counter;
  }
}
