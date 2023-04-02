import { UserMother } from '../domain/UserMother';
import { EventBusMock } from '../../shared/domain/EventBusMock';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserCreator } from '../../../src/Users/application/UserCreator';
import { UserNamesLengthExceeded } from '../../../src/Users/domain/UserNamesLengthExceeded';
import { UserCreatedDomainEventMother } from '../domain/UserCreatedDomainEventMother';

let repository: UserRepositoryMock;
let creator: UserCreator;
let eventBus: EventBusMock;

beforeEach(() => {
  repository = new UserRepositoryMock();
  eventBus = new EventBusMock();
  creator = new UserCreator(repository, eventBus);
})

describe('UserCreator', () => {
  it('should create a valid user', async () => {;
    const request = CreateUserRequestMother.random();
    const user = UserMother.fromRequest(request);
    const domainEvent = UserCreatedDomainEventMother.fromUser(user);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(user);
    eventBus.assertLastPublishedEventIs(domainEvent);
  })

  it('should throw error if user names length is exceeded', async () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidRequest();
      const user = UserMother.fromRequest(request);
      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(user);
    }).toThrow(UserNamesLengthExceeded);
  });
})