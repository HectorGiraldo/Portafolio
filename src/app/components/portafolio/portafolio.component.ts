import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styles: []
})
export class PortafolioComponent {

  producto: any = undefined;
  cod: any = undefined;

  constructor (
    private route: ActivatedRoute,
    private _ps: ProductosService
  ) {
    route.params.subscribe(parametros => {
      // console.log(parametros);
      // console.log(parametros['id']);
      _ps.detalle_productos(parametros['id'])
         .subscribe( res => {
          //  console.log(res.json());
           this.producto = res.json();
           this.cod = parametros['id'];
         });


    });
  }

}
