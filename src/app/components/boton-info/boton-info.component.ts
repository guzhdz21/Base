import { Component, OnInit, Input } from '@angular/core';
import { JsonsService } from '../../services/jsons.service';
import { AlertaGeneral } from '../../interfaces/interfaces';
import { AlertasInfoService } from '../../services/alertas-info.service';

@Component({
  selector: 'app-boton-info',
  templateUrl: './boton-info.component.html',
  styleUrls: ['./boton-info.component.scss'],
})
export class BotonInfoComponent implements OnInit {

  @Input() titulo: string;
  @Input() color: string;

  alertasInfo: AlertaGeneral[];

  constructor(private jsonsService: JsonsService,
              private alertasInfoService: AlertasInfoService) { }

  ngOnInit() {
    this.obtenerAlertas();
  }

  botonInfo(titulo: string) {
    for(let element of this.alertasInfo) {
      if(titulo == element.titulo) {
        this.alertasInfoService.presentAlertGenerica(element.titulo, element.mensaje);
        return;
      }
    }
  }

  obtenerAlertas(){
    this.jsonsService.getAlertasJson().subscribe(val => {
      this.alertasInfo = val;
    });
  }
}
