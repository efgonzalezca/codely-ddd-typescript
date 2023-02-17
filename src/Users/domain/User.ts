import { UserNames } from './UserNames';
import { UserSurnames } from './UserSurnames';
import { UserDocument } from './UserDocument';
import { UserId } from '../../shared/config/domain/Users/UserId';

interface UserInterface {
  id: UserId,
  names: UserNames,
  surnames: UserSurnames,
  document: UserDocument
}
export class User {
  readonly id: UserId;
  readonly names: UserNames;
  readonly surnames: UserSurnames;
  readonly document: UserDocument;

  constructor({ id, names, surnames, document }: UserInterface) {
    this.id = id;
    this.names = names;
    this.surnames = surnames;
    this.document = document;
  }
}