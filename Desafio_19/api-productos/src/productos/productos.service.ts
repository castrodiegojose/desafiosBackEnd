import { Injectable } from '@nestjs/common';
import { Producto } from '../interface/producto.interface';

@Injectable()
export class ProductosService {
  private readonly productos: Producto[] = [];
  create(producto: Producto) {
    const newid = this.productos.length + 1;
    producto.id = newid;
    this.productos.push(producto);
  }

  findAll(): Producto[] {
    return this.productos;
  }

  findById(_id: number) {
    return this.productos.find((producto) => producto.id == _id);
  }
}
