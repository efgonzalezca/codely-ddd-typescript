import { UserNamesMother } from './UserNamesMother';
import { User } from '../../../src/Users/domain/User';
import { UserDocumentMother } from './UserDocumentMother';
import { UserSurnamesMother } from './UserSurnamesMother';
import { UserNames } from '../../../src/Users/domain/UserNames';
import { UserIdMother } from '../../shared/domain/UserIdMother';
import { UserDocument } from '../../../src/Users/domain/UserDocument';
import { UserSurnames } from '../../../src/Users/domain/UserSurnames';
import { UserId } from '../../../src/shared/domain/Users/UserId';
import { CreateUserRequest } from '../../../src/Users/application/CreateUserRequest';

export class UserMother {
  static create(id: UserId, names: UserNames, surnames: UserSurnames, document: UserDocument): User {
    return new User({ id, names, surnames, document });
  }

  static fromRequest(request: CreateUserRequest): User {
    return this.create(
      UserIdMother.create(request.id),
      UserNamesMother.create(request.names),
      UserSurnamesMother.create(request.surnames),
      UserDocumentMother.create(request.document)
    );
  }

  static random(): User {
    return this.create(UserIdMother.random(), UserNamesMother.random(), UserSurnamesMother.random(), UserDocumentMother.random());
  }
}