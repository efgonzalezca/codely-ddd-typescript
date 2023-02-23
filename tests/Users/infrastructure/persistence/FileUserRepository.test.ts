import { User } from '../../../../src/Users/domain/User';
import { UserNames } from '../../../../src/Users/domain/UserNames';
import { UserDocument } from '../../../../src/Users/domain/UserDocument';
import { UserSurnames } from '../../../../src/Users/domain/UserSurnames';
import { UserId } from '../../../../src/shared/domain/Users/UserId';
import { FileUserRepository } from '../../../../src/Users/infrastructure/persistence/FileUserRepository';

describe('FileUserRepository', () => {
  it('should save a user', async () => {
    const expectedUser = new User({
      id: new UserId('07e845a9-3241-4dc7-8887-0426f10b9857'),
      names: new UserNames('Efraín'),
      surnames: new UserSurnames('González'),
      document: new UserDocument('1053850398')
    }
    );
    const repository = new FileUserRepository();

    await repository.save(expectedUser);

    const user = await repository.search(expectedUser.id.value);
    expect(user).toEqual(expectedUser);
  })
})