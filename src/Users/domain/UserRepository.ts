import { User } from './User';
import { UserDocument } from './UserDocument';
import { UserId } from '../../shared/domain/Users/UserId';
import { Nullable } from '../../shared/domain/value-object/Nullable';

export interface UserRepository {
  save(user: User): Promise<void>;
  search(id: UserId): Promise<Nullable<User>>;
  search(document: UserDocument): Promise<Nullable<User>>;
  search(value: UserId | UserDocument): Promise<Nullable<User>>;
}