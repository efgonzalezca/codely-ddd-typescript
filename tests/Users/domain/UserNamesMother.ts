import { WordMother } from '../../shared/domain/WordMother';
import { UserNames } from '../../../src/Users/domain/UserNames';

export class UserNamesMother {
  static create(value: string): UserNames {
    return new UserNames(value);
  }

  static random(): UserNames {
    return this.create(WordMother.random({ maxLength: 30}));
  }

  static invalidNames(): string {
    return 'a'.repeat(40);
  }
}