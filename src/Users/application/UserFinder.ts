import { User } from '../domain/User';
import { UserId } from '../../shared/domain/Users/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserFinder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<User> { 
    const response = await this.repository.search(new UserId(id));
    if(!response) {
      throw new Error('User not found')
    }
    return response;
  }
}