import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { Producto } from 'src/interface/producto.interface';

@Controller('productos')
export class ProductosController {
  constructor(private readonly procuctosService: ProductosService) {}
  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    this.procuctosService.create(createProductoDto);
  }

  @Get()
  async getProductos(): Promise<Producto[]> {
    return this.procuctosService.findAll();
  }

  @Get(':id')
  async getProducto(@Param('id') _id: number) {
    return this.procuctosService.findById(_id);
  }
}
