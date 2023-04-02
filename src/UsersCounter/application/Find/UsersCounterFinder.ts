import { UsersCounterNotExist } from '../../domain/UsersCounterNotExist';
import { UsersCounterRepository } from '../../domain/UsersCounterRepository';

export class UsersCounterFinder {
  private repository: UsersCounterRepository;

  constructor(repository: UsersCounterRepository) {
    this.repository = repository;
  }

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new UsersCounterNotExist();
    }

    return counter.total.value;
  }
}
