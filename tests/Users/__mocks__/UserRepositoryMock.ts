import { User } from '../../../src/Users/domain/User';
import { UserId } from '../../../src/shared/domain/Users/UserId';
import { UserDocument } from '../../../src/Users/domain/UserDocument';
import { UserRepository } from '../../../src/Users/domain/UserRepository';
import { Nullable } from '../../../src/shared/domain/value-object/Nullable';

interface Cases {
  UserId(): User | undefined
  UserDocument(): User | undefined
}
export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private users: Array<User> = [];

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }
  
  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  returnOnSearch(user: User) {
    this.users.push(user);
  }
  
  assertSearchById(user: User, expected: User) {
    expect(expected).toEqual(user)
  }
  
  async search(value: UserId | UserDocument): Promise<Nullable<User>> {
    this.searchMock();
    const cases: Cases = {
      UserId: () => this.users.find(user => user.id.value === value.value),
      UserDocument: () => this.users.find(user => user.document.value === value.value),
    }
    
    const user = cases[<keyof Cases>value.constructor.name]();
    return user ? user : null; 
  }

  clearUsers(): void {
    this.users = [];
  }
}