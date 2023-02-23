import { User } from '../../../src/Users/domain/User';
import { UserRepository } from '../../../src/Users/domain/UserRepository';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;

  constructor() {
    this.saveMock = jest.fn();
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }
}