import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  createVehicle(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle';
  }

  findVehiclesByIdDriver() {
    return `This action returns all vehicles`;
  }

  updateVehicle(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  removeVehicle(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
