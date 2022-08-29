import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';


@Controller('vehicle')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  postVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Get(':idDriver')
  getVehiclesByIdDriver(@Param('id') idDriver: number) {
    return this.vehiclesService.findVehiclesByIdDriver(idDriver);
  }

  @Put(':id')
  putVehicle(@Param('id') id: string, @Body() updateCrudDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(+id, updateCrudDto);
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: number) {
    return this.vehiclesService.removeVehicle(+id);
  }
}
