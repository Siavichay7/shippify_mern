/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Console } from "console";
import { Repository } from "typeorm";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { DriverDto } from "./dto/driver.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehicleDto } from "./dto/vehicle.dto";
import { Driver } from "./entities/driver.entity";
import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Driver) private driverRepo: Repository<Driver>,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const nuevoDato = await this.vehicleRepo.create(createVehicleDto);
    const guardarDato: Vehicle = await this.vehicleRepo.save(nuevoDato);
    console.log(guardarDato)
    return plainToClass(VehicleDto, guardarDato);
  }

  async findVehiclesByIdDriver(idDriver: number): Promise<VehicleDto[]> {
    const vehicles: Vehicle[] = await this.vehicleRepo.find({
      where: { driverId: idDriver },
    });
    return vehicles.map((vehicle: Vehicle) =>
      plainToClass(VehicleDto, vehicle),
    );
  }

  async findDrivers(): Promise<DriverDto[]> {
    const drivers: Driver[] = await this.driverRepo.find({take: 10});
    return drivers.map((driver: Driver) =>
      plainToClass(DriverDto, driver),
    );
  }

  async updateVehicle(id: number, changes: UpdateVehicleDto): Promise<VehicleDto> {
    // eslint-disable-next-line prettier/prettier
    const vehicle = await this.vehicleRepo.findOneBy({id: id});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not exist`);
    }    
    this.vehicleRepo.merge(vehicle, changes);
    const guardarDato: Vehicle = await this.vehicleRepo.save(vehicle);
    console.log(guardarDato)
    return plainToClass(VehicleDto, guardarDato);
  }

  async removeVehicle(id: number): Promise<any> {
    const vehicle = await this.vehicleRepo.findOneBy({id: id});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not exist`);
    }   
    return await this.vehicleRepo.delete(id)
  }
}
