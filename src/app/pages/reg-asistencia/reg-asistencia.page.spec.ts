import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegAsistenciaPage } from './reg-asistencia.page';

describe('RegAsistenciaPage', () => {
  let component: RegAsistenciaPage;
  let fixture: ComponentFixture<RegAsistenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegAsistenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
