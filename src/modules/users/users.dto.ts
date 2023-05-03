import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Transform, Type } from 'class-transformer';

export class updateUserDto {
  @IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') })
  @IsNotEmpty()
  @Type(() => Number)
  id;

  @IsBoolean({ message: i18nValidationMessage('validation.IS_BOOLEAN') })
  @IsOptional()
  @Transform(({ value }) => {
    return ['true'].indexOf(value) > -1;
  })
  isPartner;
}
