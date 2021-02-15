import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnitParametersPage } from './unit-parameters.page';

describe('UnitParametersPage', () => {
  let component: UnitParametersPage;
  let fixture: ComponentFixture<UnitParametersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitParametersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitParametersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
