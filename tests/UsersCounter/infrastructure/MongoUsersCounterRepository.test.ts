import { UsersCounterMother } from '../domain/UsersCounterMother';
import container from '../../../src/api/dependency-injection/index';
import { EnvironmentArranger } from '../../shared/infrastructure/arranger/EnvironmentArranger';   
import { UsersCounterRepository } from '../../../src/UsersCounter/domain/UsersCounterRepository';

const repository: UsersCounterRepository = container.get('usersCounter.domain.UsersCounterRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('app.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
})

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
})

describe('UsersCounterRepository', () => {
  describe('#save', () => {
    it('should save a users counter', async () => {
      const user = UsersCounterMother.random();
      await repository.save(user);
    })
  })

  describe('#search', () => {
    it('should return an existing user', async () => {
      const expectedCounter = UsersCounterMother.random();
      await repository.save(expectedCounter);

      const counter = await repository.search();

      expect(expectedCounter).toEqual(counter);
    });

    it('should not return null if there is no users counter', async () => {
      expect(await repository.search()).toBeFalsy();
    });
  });
})