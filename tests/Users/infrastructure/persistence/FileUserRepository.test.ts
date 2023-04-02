import { UserMother } from '../../domain/UserMother';
import { FileUserRepository } from '../../../../src/Users/infrastructure/persistence/FileUserRepository';

describe('FileUserRepository', () => {
  it('should save a user', async () => {
    const expectedUser = UserMother.random();
    const repository = new FileUserRepository();

    await repository.save(expectedUser);

    const user = await repository.search(expectedUser.id);
    expect(user).toEqual(expectedUser);
  })
})