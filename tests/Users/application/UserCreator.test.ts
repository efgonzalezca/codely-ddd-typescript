import { User } from '../../../src/Users/domain/User';
import { UserNames } from '../../../src/Users/domain/UserNames';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserSurnames } from '../../../src/Users/domain/UserSurnames';
import { UserDocument } from '../../../src/Users/domain/UserDocument';
import { UserId } from '../../../src/shared/config/domain/Users/UserId';
import { UserCreator } from '../../../src/Users/application/UserCreator';
import { UserNamesLengthExceeded } from '../../../src/Users/domain/UserNamesLengthExceeded';

describe('UserCreator', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  })
  
  it('should create a valid user', async () => {
    const creator = new UserCreator(repository);
    const id = new UserId('07e845a9-3241-4dc7-8887-0426f10b9857');
    const names = new UserNames('Efraín');
    const surnames = new UserSurnames('González');
    const document = new UserDocument('1053850398');
    const expectedUser = new User(id, names, surnames, document);

    await creator.run(id, names, surnames, document);

    repository.assertSaveHaveBeenCalledWith(expectedUser);
  })

  it('should throw error if course name length is exceeded', async () => {
    const creator = new UserCreator(repository);
    const id = new UserId('07e845a9-3241-4dc7-8887-0426f10b9857');
    const names = new UserNames('Efraín'.repeat(30));
    const surnames = new UserSurnames('González');
    const document = new UserDocument('1053850398');
    expect(async () => {
      const user = new User(id, names, surnames, document);
    
      await creator.run(id, names, surnames, document);

      repository.assertSaveHaveBeenCalledWith(user);
    }).toThrow(UserNamesLengthExceeded);
  });
})