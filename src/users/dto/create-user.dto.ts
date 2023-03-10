import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(6)
    name: string;

}