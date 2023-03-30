import { writeFile, readFile } from 'fs/promises';

import { deserialize, serialize } from 'bson';

import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { Nullable } from '../../../shared/domain/value-object/Nullable';
import { UserId } from '../../../shared/domain/Users/UserId';

export class FileUserRepository implements UserRepository {
  private FILE_PATH = `${__dirname}/users`;
  
  async save(user: User): Promise<void> {
    writeFile(this.filePath(user.id.value), serialize(user));
  }

  async search(userId: UserId): Promise<Nullable<User>> {
    const userData = await readFile(this.filePath(userId.value));
    const { id, names, surnames, document } = deserialize(userData);
    return new User(id, names, surnames, document);
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}