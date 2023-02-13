import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class UserSurnames extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}