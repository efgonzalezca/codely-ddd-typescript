import { User } from '../../../src/Users/domain/User';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserCreator } from '../../../src/Users/application/UserCreator';

describe('UserCreator', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  })

  it('should create a valid user', async () => {
    const creator = new UserCreator(repository);
    const id = '5fc79d389bdef8041fa3b6d7';
    const names = 'Efraín';
    const surnames = 'González';
    const document = '1053850398';
    const expectedUser = new User(id, names, surnames, document);

    await creator.run(id, names, surnames, document);

    repository.assertSaveHaveBeenCalledWith(expectedUser);
  })
})