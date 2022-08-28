import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';


@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  postVehicle(@Body() createCrudDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createCrudDto);
  }

  @Get(':idVehicle')
  getVehiclesByIdDriver(@Param('id') id: string) {
    return this.vehiclesService.findVehiclesByIdDriver();
  }

  @Put(':id')
  putVehicle(@Param('id') id: string, @Body() updateCrudDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(+id, updateCrudDto);
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.removeVehicle(+id);
  }
}
