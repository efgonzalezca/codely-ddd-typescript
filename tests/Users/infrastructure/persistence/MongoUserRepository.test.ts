import { UserMother } from '../../domain/UserMother';
import container from '../../../../src/api/dependency-injection';
import { UserRepository } from '../../../../src/Users/domain/UserRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/EnvironmentArranger';

const repository: UserRepository = container.get('users.domain.UserRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('app.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
})

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
})

describe('UserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = UserMother.random();
      await repository.save(user);
    })
  })
})