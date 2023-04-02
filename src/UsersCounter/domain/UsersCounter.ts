import { UsersCounterId } from './UsersCounterId';
import { UsersCounterTotal } from './UsersCounterTotal';
import { UserId } from '../../shared/domain/Users/UserId';
import { Uuid } from '../../shared/domain/value-object/Uuid';
import { AggregateRoot } from '../../shared/domain/value-object/AggregateRoot';
import { UsersCounterIncrementedDomainEvent } from './UsersCounterIncrementedDomainEvent';

export class UsersCounter extends AggregateRoot {
  readonly id: UsersCounterId;
  private _total: UsersCounterTotal;
  readonly existingUsers: Array<UserId>;

  constructor(id: UsersCounterId, total: UsersCounterTotal, existingUsers?: Array<UserId>) {
    super();
    this.id = id;
    this._total = total;
    this.existingUsers = existingUsers || [];
  }

  public get total(): UsersCounterTotal {
    return this._total;
  }

  static initialize(id: Uuid): UsersCounter {
    return new UsersCounter(id, UsersCounterTotal.initialize());
  }

  increment(userId: UserId) {
    this._total = this.total.increment();
    this.existingUsers.push(userId);
    this.record(new UsersCounterIncrementedDomainEvent({ aggregateId: this.id.value, total: this.total.value }));
  }

  hasIncremented(userId: UserId): boolean {
    const exists = this.existingUsers.find(entry => entry.value === userId.value);
    return exists !== undefined;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingUsers: this.existingUsers.map(userId => userId.value)
    };
  }

  static fromPrimitives(data: { id: string; total: number; existingUsers: string[] }): UsersCounter {
    return new UsersCounter(
      new UsersCounterId(data.id),
      new UsersCounterTotal(data.total),
      data.existingUsers.map(entry => new UserId(entry))
    );
  }
}