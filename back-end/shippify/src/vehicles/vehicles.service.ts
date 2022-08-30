/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Console } from "console";
import { Repository } from "typeorm";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehicleDto } from "./dto/vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const nuevoDato = await this.vehicleRepo.create(createVehicleDto);
    const guardarDato: Vehicle = await this.vehicleRepo.save(nuevoDato);
    return plainToClass(VehicleDto, guardarDato);
  }

  async findVehiclesByIdDriver(idDriver: number) {
    const vehicles: Vehicle[] = await this.vehicleRepo.find({
      where: { driverId: idDriver },
      withDeleted: false,
    });
    return vehicles.map((vehicle: Vehicle) =>
      plainToClass(VehicleDto, vehicle),
    );
  }

  async updateVehicle(id: number, changes: UpdateVehicleDto) {
    // eslint-disable-next-line prettier/prettier
    const vehicle = await this.vehicleRepo.findOneBy({id: id});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not exist`);
    }    
    this.vehicleRepo.merge(vehicle, changes);
    const guardarDato: Vehicle = await this.vehicleRepo.save(vehicle);
    return plainToClass(VehicleDto, guardarDato);
  }

  async removeVehicle(id: number) {
    const vehicle = await this.vehicleRepo.findOneBy({id: id});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not exist`);
    }   
    return await this.vehicleRepo.delete(id)
  }
}
