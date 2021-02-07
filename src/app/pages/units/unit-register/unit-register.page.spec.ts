import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitRegisterPage } from './unit-register.page';

describe('UnitRegisterPage', () => {
  let component: UnitRegisterPage;
  let fixture: ComponentFixture<UnitRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
