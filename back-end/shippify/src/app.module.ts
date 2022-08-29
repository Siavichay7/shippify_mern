import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './vehicles/entities/driver.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';

@Module({
  imports: [
    VehiclesModule,
    //ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'shippify4.cv2sgxogwffx.sa-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'candidate3',
      password: 'ubnpS3rySnj88Sum',
      database: 'shippify3',
      entities: [
        __dirname + "/entity/*.ts"
      ],
      synchronize: true,
    }),

  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
