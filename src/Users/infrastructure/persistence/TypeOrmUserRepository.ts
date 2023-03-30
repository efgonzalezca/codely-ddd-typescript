import { EntitySchema, Equal } from 'typeorm';

import { User } from '../../domain/User';
import { UserEntity } from './typeorm/UserEntity';
import { UserId } from '../../../shared/domain/Users/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { Nullable } from '../../../shared/domain/value-object/Nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/TypeOrmRepository';

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
  public save(user: User): Promise<void> {
    return this.persist(user);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const repository = await this.repository();

    const user = await repository.findOne({ where: { id: Equal(id)}, });

    return user;
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
}
