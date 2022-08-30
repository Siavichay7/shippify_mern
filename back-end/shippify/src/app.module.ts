import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './vehicles/entities/driver.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Module } from '@nestjs/common';
import config from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    VehiclesModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    //HttpModule
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
