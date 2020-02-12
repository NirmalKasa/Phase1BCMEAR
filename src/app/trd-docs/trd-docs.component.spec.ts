import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrdDocsComponent } from './trd-docs.component';

describe('TrdDocsComponent', () => {
  let component: TrdDocsComponent;
  let fixture: ComponentFixture<TrdDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrdDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrdDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
