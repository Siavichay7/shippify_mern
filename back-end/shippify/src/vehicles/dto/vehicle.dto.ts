import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class VehicleDto {
    @Expose()
    @ApiProperty()
    readonly id: number;

    @Expose()
    @ApiProperty()
    readonly driverId: string;

    @Expose()
    @ApiProperty()
    readonly plate: string;

    @Expose()
    @ApiProperty()
    readonly model: string;

    @Expose()
    @ApiProperty()
    readonly type: string;

    @Expose()
    @ApiProperty()
    readonly capacity: string;

    @Expose()
    @ApiProperty()
    readonly creationDate: any;
}
