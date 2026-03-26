import { PartialType } from '@nestjs/mapped-types';
import { CreateCharactersDto } from '.';

export class UpdatCharactersDto extends PartialType(CreateCharactersDto) {}
