import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WestWingComponent } from './west-wing.component';

describe('WestWingComponent', () => {
  let component: WestWingComponent;
  let fixture: ComponentFixture<WestWingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WestWingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WestWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
