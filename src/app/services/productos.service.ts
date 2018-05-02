import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { reject } from 'q';

@Injectable()
export class ProductosService {
  productos: any[] = [];
  productos_filtrado: any[] = [];
  // tslint:disable-next-line:no-inferrable-types
  cargando: boolean = true;

  constructor(
    private http: Http
  ) {

  this.cargando_productos();

   }

   public buscar_producto(termino: string) {

    if (this.productos.length === 0) {
      this.cargando_productos().then(() => {
        this.filtrar_productos(termino);

      });
    } else {
        this.filtrar_productos(termino);
    }

   }

   private filtrar_productos(termino: string) {
      this.productos_filtrado = [];

      termino = termino.toLowerCase();

      this.productos.forEach(prod => {

        if (prod.categoria.indexOf(termino) >= 0 || prod.titulo.toLowerCase().indexOf(termino) >= 0 ) {

          this.productos_filtrado.push(prod);

        }
        // console.log(prod);
      });
    }



   public detalle_productos( cod: string) {

    return this.http.get(`https://paginaweb-29fa8.firebaseio.com/Productos/${cod}.json`);
   }

   public cargando_productos() {
     this.cargando = true;

     // tslint:disable-next-line:no-shadowed-variable
     const promesa = new Promise((resolve, reject ) => {

       this.http.get('https://paginaweb-29fa8.firebaseio.com/productos_idx.json')
                .subscribe(res => {
                  // console.log(res.json());
                  this.cargando = false;
                  this.productos = res.json();
                  resolve();
                });
     });
     return promesa;

   }
}
