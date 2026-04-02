import { PartialType } from '@nestjs/swagger';
import { CreateDifusionDto } from './create-difusion.dto';

export class UpdateDifusionDto extends PartialType(CreateDifusionDto) {}
