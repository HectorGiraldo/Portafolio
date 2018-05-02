import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InformacionService {
  info: any = {};
  // tslint:disable-next-line:no-inferrable-types
  cargada: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  carga_nosotros: boolean = false;
  equipo: any [] = [];

  constructor(
    public http: Http
  ) {
    this.carga_info();
    this.carga_sobre_nosotros();
  }

  public carga_info() {
    this.http.get('assets/data/info.pagina.json').subscribe(data => {
      this.cargada = true;
      this.info = data.json();
    });
  }

  public carga_sobre_nosotros() {
    this.http
      .get('https://paginaweb-29fa8.firebaseio.com/Equipo.json')
      .subscribe(data => {
        // console.log(data.json());
        this.carga_nosotros = true;
        this.equipo = data.json();
      });
  }
}
