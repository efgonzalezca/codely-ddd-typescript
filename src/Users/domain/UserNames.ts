import { UserNamesLengthExceeded } from './UserNamesLengthExceeded';
import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export class UserNames extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if(value.length > 30 ) {
      throw new UserNamesLengthExceeded(`The User Names <${value}> has more than 30 characters`);
    }
  }
}