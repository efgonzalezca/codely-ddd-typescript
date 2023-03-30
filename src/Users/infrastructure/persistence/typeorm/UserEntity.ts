import { EntitySchema } from 'typeorm';

import { User } from '../../../domain/User';
import { UserNames } from '../../../domain/UserNames';
import { UserSurnames } from '../../../domain/UserSurnames';
import { UserDocument } from '../../../domain/UserDocument';
import { UserId } from '../../../../shared/domain/Users/UserId';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/ValueObjectTransformer';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId)
    },
    names: {
      type: String,
      transformer: ValueObjectTransformer(UserNames)
    },
    surnames: {
      type: String,
      transformer: ValueObjectTransformer(UserSurnames)
    },
    document: {
      type: String,
      transformer: ValueObjectTransformer(UserDocument)
    }
  }
});
