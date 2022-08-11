/* eslint-disable prettier/prettier */
export class CreateProductoDto {
  id: number;
  readonly producto: string;
  readonly precio: number;
  readonly foto: string;
}