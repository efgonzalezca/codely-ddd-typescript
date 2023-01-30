import { User } from '../domain/User';
import container from '../../api/dependency-injection';
import { UserRepository } from '../domain/UserRepository';

export class UserCreator {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    if(typeof repository === 'string') {
      this.repository = container.get('users.domain.UserRepository');
    } else {
      this.repository = repository;
    }
  }

  async run(id: string, names: string, surnames: string, document: string): Promise<void> {
    const user = new User(id, names, surnames, document);
    return this.repository.save(user);
  }
}