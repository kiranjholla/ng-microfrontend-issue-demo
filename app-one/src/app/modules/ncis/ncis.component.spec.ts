import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCISComponent } from './ncis.component';

describe('NCISComponent', () => {
  let component: NCISComponent;
  let fixture: ComponentFixture<NCISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NCISComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
