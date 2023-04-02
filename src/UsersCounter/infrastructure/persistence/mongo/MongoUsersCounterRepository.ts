import { UsersCounter } from '../../../domain/UsersCounter';
import { Nullable } from '../../../../shared/domain/value-object/Nullable';
import { UsersCounterRepository } from '../../../domain/UsersCounterRepository';
import { MongoRepository } from '../../../../shared/infrastructure/persistence/mongo/MongoRepository';

interface UsersCounterDocument {
  _id: string;
  total: number;
  existingUsers: string[];
}

export class MongoUsersCounterRepository extends MongoRepository<UsersCounter> implements UsersCounterRepository {
  protected collectionName(): string {
    return 'usersCounter';
  }

  public save(counter: UsersCounter): Promise<void> {
    return this.persist(counter.id.value, counter);
  }

  public async search(): Promise<Nullable<UsersCounter>> {
    const collection = await this.collection();

    const document = await collection.findOne<UsersCounterDocument>({});
    return document ? UsersCounter.fromPrimitives({ ...document, id: document._id }) : null;
  }
}
