import { ApiProperty } from '@nestjs/swagger';

export class ResponseDifusionDto {
  @ApiProperty({
    example: 'OK',
    type: String,
    readOnly: true,
  })
  token: string;
}
