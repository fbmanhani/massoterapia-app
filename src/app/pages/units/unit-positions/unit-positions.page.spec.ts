import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UnitPositionsPage } from './unit-positions.page';


describe('UnitParametersPage', () => {
  let component: UnitPositionsPage;
  let fixture: ComponentFixture<UnitPositionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitPositionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnitPositionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
