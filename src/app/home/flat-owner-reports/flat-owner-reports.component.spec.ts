import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatOwnerReportsComponent } from './flat-owner-reports.component';

describe('FlatOwnerReportsComponent', () => {
  let component: FlatOwnerReportsComponent;
  let fixture: ComponentFixture<FlatOwnerReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatOwnerReportsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatOwnerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
