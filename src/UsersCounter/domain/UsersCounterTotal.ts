import { NumberValueObject } from '../../shared/domain/value-object/IntValueObject';

export class UsersCounterTotal extends NumberValueObject {
  increment(): UsersCounterTotal {
    return new UsersCounterTotal(this.value + 1);
  }

  static initialize(): UsersCounterTotal {
    return new UsersCounterTotal(0);
  }
}
