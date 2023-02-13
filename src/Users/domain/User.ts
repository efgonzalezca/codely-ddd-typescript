import { UserNames } from './UserNames';
import { UserSurnames } from './UserSurnames';
import { UserDocument } from './UserDocument';
import { UserId } from '../../shared/config/domain/Users/UserId';

export class User {
  readonly id: UserId;
  readonly names: UserNames;
  readonly surnames: UserSurnames;
  readonly document: UserDocument;

  constructor(id: UserId, names: UserNames, surnames: UserSurnames, document: UserDocument) {
    this.id = id;
    this.names = names;
    this.surnames = surnames;
    this.document = document;
  }
}