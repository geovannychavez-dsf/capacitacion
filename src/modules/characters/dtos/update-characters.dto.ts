import { ApiExtraModels, OmitType } from '@nestjs/swagger';
import { CreateCharactersDto } from '.';

@ApiExtraModels()
export class UpdatCharactersDto extends OmitType(CreateCharactersDto, ['id']) {}
