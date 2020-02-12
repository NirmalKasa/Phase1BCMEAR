import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrdComponent } from './brd.component';

describe('BrdComponent', () => {
  let component: BrdComponent;
  let fixture: ComponentFixture<BrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
