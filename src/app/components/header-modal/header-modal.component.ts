import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() ruta: string;
  
  constructor(private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  regresar() {
    this.modalCtrl.dismiss();
    this.router.navigate([this.ruta]);
  }
}
