import { v4 as uuid, validate } from 'uuid';

import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Uuid extends ValueObject<string> {
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }

  toString(): string {
    return this.value;
  }
}