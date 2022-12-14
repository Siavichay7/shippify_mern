import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";


export class CreateVehicleDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly driverId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly plate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly model: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly capacity: string;
}
