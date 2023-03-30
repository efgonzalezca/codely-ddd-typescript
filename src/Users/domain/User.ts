import { UserNames } from './UserNames';
import { UserSurnames } from './UserSurnames';
import { UserDocument } from './UserDocument';
import { UserId } from '../../shared/domain/Users/UserId';
import { AggregateRoot } from '../../shared/domain/value-object/AggregateRoot';

interface UserPlainDataInterface {
  id: string,
  names: string,
  surnames: string,
  document: string
}
export class User extends AggregateRoot {
  readonly id: UserId;
  readonly names: UserNames;
  readonly surnames: UserSurnames;
  readonly document: UserDocument;

  constructor(id: UserId, names: UserNames, surnames: UserSurnames, document: UserDocument) {
    super();
    this.id = id;
    this.names = names;
    this.surnames = surnames;
    this.document = document;
  }

  static fromPrimitives(plainData: UserPlainDataInterface): User {
    return new User(
      new UserId(plainData.id),
      new UserNames(plainData.names),
      new UserSurnames(plainData.surnames),
      new UserDocument(plainData.document)
    )
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      names: this.names.value,
      surnames: this.surnames.value,
      document: this.document.value
    }
  }
}