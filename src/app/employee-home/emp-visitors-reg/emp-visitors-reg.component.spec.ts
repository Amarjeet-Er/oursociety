import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpVisitorsRegComponent } from './emp-visitors-reg.component';

describe('EmpVisitorsRegComponent', () => {
  let component: EmpVisitorsRegComponent;
  let fixture: ComponentFixture<EmpVisitorsRegComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpVisitorsRegComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpVisitorsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
