import { User } from '../../domain/User';
import { UserId } from '../../../shared/domain/Users/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { Nullable } from '../../../shared/domain/value-object/Nullable';
import { MongoRepository } from '../../../shared/infrastructure/persistence/mongo/MongoRepository';

interface UserMongoDocument {
  id: string,
  names: string,
  surnames: string,
  document: string
}

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {

  async save(user: User): Promise<void> {
    return this.persist(user.id.value, user);
  }
  
  async search(id: UserId): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne<UserMongoDocument>({ _id: id.value });
    return document 
      ? User.fromPrimitives({
        id: id.value,
        names: document.names,
        surnames: document.surnames,
        document: document.document
      })
      : null
  }
  
  protected collectionName(): string {
    return 'users';
  }
}