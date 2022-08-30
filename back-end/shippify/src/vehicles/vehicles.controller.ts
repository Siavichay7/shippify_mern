/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//import { TransformInterceptor } from 'src/providers/transform.interceptor';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // @UseInterceptors(TransformInterceptor)
  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Post()
  postVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Get(':idDriver')
  getVehiclesByIdDriver(@Param('id') idDriver: number) {
    return this.vehiclesService.findVehiclesByIdDriver(idDriver);
  }

  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Put(':id')
  putVehicle(@Param('id') id: string, @Body() updateCrudDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(+id, updateCrudDto);
  }

  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Delete(':id')
  deleteVehicle(@Param('id') id: number) {
    return this.vehiclesService.removeVehicle(+id);
  }
}
