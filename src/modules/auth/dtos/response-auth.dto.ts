import { ApiProperty } from "@nestjs/swagger";

export class ResponseAuthDto {
    @ApiProperty({ type: String ,
        readOnly: true  
    })
    token: string;
}