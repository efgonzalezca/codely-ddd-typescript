import { IntegerMother } from '../../shared/domain/IntegerMother';
import { UsersCounterTotal } from '../../../src/UsersCounter/domain/UsersCounterTotal';

export class UsersCounterTotalMother {
  static random() {
    return new UsersCounterTotal(IntegerMother.random());
  }
}
