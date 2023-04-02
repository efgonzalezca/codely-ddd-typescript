import { UsersCounterMother } from '../../domain/UsersCounterMother';
import { UsersCounterRepositoryMock } from '../../__mocks__/UsersCounterRepositoryMock';
import { UsersCounterNotExist } from '../../../../src/UsersCounter/domain/UsersCounterNotExist';
import { UsersCounterFinder } from '../../../../src/UsersCounter/application/Find/UsersCounterFinder';

describe('UsersCounterFinder', () => {
  let repository: UsersCounterRepositoryMock;

  beforeEach(() => {
    repository = new UsersCounterRepositoryMock();
  });

  it('should find an existing users counter', async () => {
    const counter = UsersCounterMother.random();
    repository.returnOnSearch(counter);
    const finder = new UsersCounterFinder(repository);

    const response = await finder.run();

    repository.assertSearch();
    expect(counter.total.value).toEqual(response);
  });

  it('should throw an exception when users counter does not exists', async () => {
    const finder = new UsersCounterFinder(repository);

    await expect(finder.run()).rejects.toBeInstanceOf(UsersCounterNotExist);
  });
});
