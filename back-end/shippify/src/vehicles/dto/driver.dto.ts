import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class DriverDto {
    @Expose()
    @ApiProperty()
    readonly id: number;

    @Expose()
    @ApiProperty()
    readonly companyId: number;

    @Expose()
    @ApiProperty()
    readonly city: string;

    @Expose()
    @ApiProperty()
    readonly firstName: string;

    @Expose()
    @ApiProperty()
    readonly lastName: string;

    @Expose()
    @ApiProperty()
    readonly email: string;

    @Expose()
    @ApiProperty()
    readonly phone: string;

    @Expose()
    @ApiProperty()
    readonly avatarUrl: string;

    @Expose()
    @ApiProperty()
    readonly status: string;
}
