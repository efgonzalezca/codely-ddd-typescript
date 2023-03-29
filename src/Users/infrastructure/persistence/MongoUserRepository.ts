import { User } from '../../domain/User';
import { UserId } from '../../../shared/domain/Users/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { Nullable } from '../../../shared/domain/value-object/Nullable';
import { MongoRepository } from '../../../shared/infrastructure/persistence/mongo/MongoRepository';
import { UserDocument } from '../../domain/UserDocument';

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
  
  async search(id: UserDocument): Promise<Nullable<User>>;
  async search(document: UserDocument): Promise<Nullable<User>>;
  async search(value: UserId | UserDocument): Promise<Nullable<User>> {
    const collection = await this.collection();
    let mongoDocument: UserMongoDocument | null;
    if(value instanceof UserId) {
      mongoDocument = await collection.findOne<UserMongoDocument>({ _id: value.value });
    }
    if(value instanceof UserDocument) {
      mongoDocument = await collection.findOne<UserMongoDocument>({ document: value.value });
    }
    
    return mongoDocument! 
      ? User.fromPrimitives({
        id: value.value,
        names: mongoDocument.names,
        surnames: mongoDocument.surnames,
        document: mongoDocument.document
      })
      : null
  }
  
  protected collectionName(): string {
    return 'users';
  }
}