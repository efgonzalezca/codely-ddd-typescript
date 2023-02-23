import { WordMother } from '../../shared/domain/WordMother';
import { UserDocument } from '../../../src/Users/domain/UserDocument';

export class UserDocumentMother {
  static create(value: string): UserDocument {
    return new UserDocument(value);
  }

  static random(): UserDocument {
    return this.create(WordMother.random({ maxLength: 30}));
  }

  static invalidDocument(): string {
    return 'a'.repeat(40);
  }
}