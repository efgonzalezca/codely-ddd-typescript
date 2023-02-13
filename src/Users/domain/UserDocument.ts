import { StringValueObject } from '../../shared/config/domain/value-object/StringValueObject';

export class UserDocument extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}