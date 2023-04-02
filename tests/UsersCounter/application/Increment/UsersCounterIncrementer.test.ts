import { EventBusMock } from '../../../shared/domain/EventBusMock';
import { UserIdMother } from '../../../shared/domain/UserIdMother';
import { UsersCounterMother } from '../../domain/UsersCounterMother';
import { UsersCounter } from '../../../../src/UsersCounter/domain/UsersCounter';
import { UsersCounterRepositoryMock } from '../../__mocks__/UsersCounterRepositoryMock';
import { UsersCounterIncrementedDomainEventMother } from '../../domain/UsersCounterIncrementedDomainEventMother';
import { UsersCounterIncrementer } from '../../../../src/UsersCounter/application/Increment/UsersCounterIncrementer';

describe('UsersCounter Incrementer', () => {
  let incrementer: UsersCounterIncrementer;
  let eventBus: EventBusMock;
  let repository: UsersCounterRepositoryMock;

  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new UsersCounterRepositoryMock();
    incrementer = new UsersCounterIncrementer(repository, eventBus);
  });

  it('should initialize a new counter', async () => {
    const userId = UserIdMother.random();
    const counter = UsersCounterMother.withOne(userId);

    await incrementer.run(userId);

    repository.assertLastUsersCounterSaved(counter);
  });

  it('should increment an existing counter', async () => {
    const existingCounter = UsersCounterMother.random();
    repository.returnOnSearch(existingCounter);
    const userId = UserIdMother.random();
    const expected = UsersCounter.fromPrimitives(existingCounter.toPrimitives());
    expected.increment(userId);
    const expectedEvent = UsersCounterIncrementedDomainEventMother.fromUsersCounter(expected);

    await incrementer.run(userId);

    repository.assertLastUsersCounterSaved(expected);
    eventBus.assertLastPublishedEventIs(expectedEvent);
  });

  it('should not increment an already incremented counter', async () => {
    const existingCounter = UsersCounterMother.random();
    repository.returnOnSearch(existingCounter);
    const userId = existingCounter.existingUsers[0];

    await incrementer.run(userId);

    repository.assertNotSave();
  });
});
