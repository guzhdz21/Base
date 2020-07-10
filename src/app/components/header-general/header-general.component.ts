import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['./header-general.component.scss'],
})
export class HeaderGeneralComponent implements OnInit {

  @Input() titulo: string;
  @Input() ruta: string;

  constructor(private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {}

  regresar() {
    this.router.navigate([this.ruta]);
  }
}
