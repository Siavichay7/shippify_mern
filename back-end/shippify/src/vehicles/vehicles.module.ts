import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Driver } from './entities/driver.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Driver, Company])], 
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
