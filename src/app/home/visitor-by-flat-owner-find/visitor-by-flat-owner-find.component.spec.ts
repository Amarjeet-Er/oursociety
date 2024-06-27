import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitorByFlatOwnerFindComponent } from './visitor-by-flat-owner-find.component';

describe('VisitorByFlatOwnerFindComponent', () => {
  let component: VisitorByFlatOwnerFindComponent;
  let fixture: ComponentFixture<VisitorByFlatOwnerFindComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorByFlatOwnerFindComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitorByFlatOwnerFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
