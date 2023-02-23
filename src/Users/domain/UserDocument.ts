import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export class UserDocument extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}