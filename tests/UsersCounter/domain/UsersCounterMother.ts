import { Repeater } from '../../shared/domain/Repeater';
import { UserIdMother } from '../../shared/domain/UserIdMother';
import { UserId } from '../../../src/shared/domain/Users/UserId';
import { UsersCounterTotalMother } from './UsersCounterTotalMother';
import { UsersCounter } from '../../../src/UsersCounter/domain/UsersCounter';
import { UsersCounterId } from '../../../src/UsersCounter/domain/UsersCounterId';
import { UsersCounterTotal } from '../../../src/UsersCounter/domain/UsersCounterTotal';

export class UsersCounterMother {
  static random() {
    const total = UsersCounterTotalMother.random();
    return new UsersCounter(
      UsersCounterId.random(),
      total,
      Repeater.random(UserIdMother.random.bind(UserIdMother), total.value)
    );
  }

  static withOne(userId: UserId) {
    return new UsersCounter(UsersCounterId.random(), new UsersCounterTotal(1), [userId]);
  }
}
