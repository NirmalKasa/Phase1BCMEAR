import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrdDocsComponent } from './brd-docs.component';

describe('BrdDocsComponent', () => {
  let component: BrdDocsComponent;
  let fixture: ComponentFixture<BrdDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrdDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrdDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
