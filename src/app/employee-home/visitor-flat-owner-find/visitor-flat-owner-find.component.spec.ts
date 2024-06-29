import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorFlatOwnerFindComponent } from './visitor-flat-owner-find.component';

describe('VisitorFlatOwnerFindComponent', () => {
  let component: VisitorFlatOwnerFindComponent;
  let fixture: ComponentFixture<VisitorFlatOwnerFindComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorFlatOwnerFindComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorFlatOwnerFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
