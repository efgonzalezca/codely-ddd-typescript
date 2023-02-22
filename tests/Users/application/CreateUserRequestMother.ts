import { UserNamesMother } from '../domain/UserNamesMother';
import { UserNames } from '../../../src/Users/domain/UserNames';
import { UserIdMother } from '../../shared/domain/UserIdMother';
import { UserSurnamesMother } from '../domain/UserSurnamesMother';
import { UserDocumentMother } from '../domain/UserDocumentMother';
import { UserDocument } from '../../../src/Users/domain/UserDocument';
import { UserSurnames } from '../../../src/Users/domain/UserSurnames';
import { UserId } from '../../../src/shared/domain/Users/UserId';
import { CreateUserRequest } from '../../../src/Users/application/CreateUserRequest'

export class CreateUserRequestMother {
  static create(id: UserId, names: UserNames, surnames: UserSurnames, document: UserDocument) {
    return { id: id.value, names: names.value, surnames: surnames.value, document: document.value }
  }

  static random(): CreateUserRequest {
    return this.create(UserIdMother.random(), UserNamesMother.random(), UserSurnamesMother.random(), UserDocumentMother.random())
  }

  static invalidRequest(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      names: UserNamesMother.invalidNames(),
      surnames: UserSurnamesMother.random().value,
      document: UserDocumentMother.random().value
    };
  }
}