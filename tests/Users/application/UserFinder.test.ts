import { UserMother } from '../domain/UserMother';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserFinder } from '../../../src/Users/application/UserFinder';

let repository: UserRepositoryMock;
let finder: UserFinder;

beforeEach(() => {
  repository = new UserRepositoryMock();
  finder = new UserFinder(repository);
  repository.clearUsers();
})

describe('UserFinder', () => {
  it('should find a created user by id', async () => {;
    const request = CreateUserRequestMother.random();
    const user = UserMother.fromRequest(request);
    
    repository.returnOnSearch(user);
    const expectedUser = await finder.run(user.id.value);
    repository.assertSearchById(user, expectedUser);
  })
})