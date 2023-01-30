import { User } from '../../../../src/Users/domain/User';
import { FileUserRepository } from '../../../../src/Users/infrastructure/persistence/FileUserRepository';

describe('FileUserRepository', () => {
  it('should save a user', async () => {
    const expectedUser = new User('id', 'names', 'surnames', 'document');
    const repository = new FileUserRepository();

    await repository.save(expectedUser);

    const user = await repository.search('id');
    expect(user).toEqual(expectedUser);
  })
})