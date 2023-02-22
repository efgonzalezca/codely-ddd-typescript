import { UuidMother } from './UuidMother';
import { UserId } from '../../../src/shared/domain/Users/UserId';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }
  static random(): UserId {
    return this.create(UuidMother.random());
  }
}