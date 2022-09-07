/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { TransformInterceptor } from 'src/providers/transform.interceptor';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { DriverDto } from './dto/driver.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'CREAR VEHÍCULO' })
  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Post()
  postVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @ApiOperation({ summary: 'VEHÍCULO POR DRIVER' })
  @ApiResponse({ status: 200, description: 'Success.', type:  [VehicleDto]}) 
  @Get(':idDriver')
  getVehiclesByIdDriver(@Param('idDriver') idDriver: number) {
    return this.vehiclesService.findVehiclesByIdDriver(idDriver);
  }

  @ApiOperation({ summary: 'LISTA DE DRIVERS' })
  @ApiResponse({ status: 200, description: 'Success.', type:  [DriverDto]}) 
  @Get()
  getDrivers() {
    console.log("aaa")
    return this.vehiclesService.findDrivers();
  }

  @ApiOperation({ summary: 'ACTUALIZAR VEHÍCULO' })
  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Put(':id')
  putVehicle(@Param('id') id: string, @Body() updateCrudDto: UpdateVehicleDto) {
    return this.vehiclesService.updateVehicle(+id, updateCrudDto);
  }


  @ApiOperation({ summary: 'ELIMINAR VEHÍCULO' })
  @ApiResponse({ status: 200, description: 'Success.', type:  VehicleDto}) 
  @Delete(':id')
  deleteVehicle(@Param('id') id: number) {
    return this.vehiclesService.removeVehicle(+id);
  }
}
