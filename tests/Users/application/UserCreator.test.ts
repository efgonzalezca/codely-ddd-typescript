import { UserMother } from '../domain/UserMother';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserCreator } from '../../../src/Users/application/UserCreator';
import { UserNamesLengthExceeded } from '../../../src/Users/domain/UserNamesLengthExceeded';

let repository: UserRepositoryMock;
let creator: UserCreator;

beforeEach(() => {
  repository = new UserRepositoryMock();
  creator = new UserCreator(repository);
})

describe('UserCreator', () => {
  it('should create a valid user', async () => {;
    const request = CreateUserRequestMother.random();
    const user = UserMother.fromRequest(request);
    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(user);
  })

  it('should throw error if course name length is exceeded', async () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidRequest();
      const user = UserMother.fromRequest(request);
      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(user);
    }).toThrow(UserNamesLengthExceeded);
  });
})