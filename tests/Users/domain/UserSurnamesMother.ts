import { WordMother } from '../../shared/domain/WordMother';
import { UserSurnames } from '../../../src/Users/domain/UserSurnames';

export class UserSurnamesMother {
  static create(value: string): UserSurnames {
    return new UserSurnames(value);
  }

  static random(): UserSurnames {
    return this.create(WordMother.random({ maxLength: 30}));
  }

  static invalidSurnames(): string {
    return 'a'.repeat(40);
  }
}