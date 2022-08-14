export interface IProducto {
    _id: { $oid: string },
    id: number,
    producto: string,
    precio: number,
    foto: string,
}