import { ValueObject } from '../../../domain/value-object/ValueObject';
import { NewableClass } from '../../../domain/value-object/NewableClass';

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value)
  }
}