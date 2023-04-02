import { UsersCounter } from './UsersCounter';
import { Nullable } from '../../shared/domain/value-object/Nullable';

export interface UsersCounterRepository {
  search(): Promise<Nullable<UsersCounter>>;
  save(counter: UsersCounter): Promise<void>;
}
