import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeGuardiaPage } from './home-guardia.page';

describe('HomeGuardiaPage', () => {
  let component: HomeGuardiaPage;
  let fixture: ComponentFixture<HomeGuardiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGuardiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeGuardiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
