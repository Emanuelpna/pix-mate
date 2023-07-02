import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EntityManager, ObjectType } from 'typeorm';

interface ValidationProps {
  Entity: ObjectType<unknown>;
  ColumnName: string;
}

@Injectable()
@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUnique implements ValidatorConstraintInterface {
  private readonly entityManager: EntityManager;

  async validate(
    value: unknown,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const validationProps: ValidationProps = validationArguments.constraints[0];

    const { Entity, ColumnName } = validationProps;

    const isUnique = await this.entityManager.findOne(Entity, {
      [ColumnName]: value,
    });

    if (isUnique) {
      return false;
    }

    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const validationProps: ValidationProps = validationArguments.constraints[0];

    return `'${validationProps.ColumnName}' precisa ser único`;
  }
}
