import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsdDocsComponent } from './fsd-docs.component';

describe('FsdDocsComponent', () => {
  let component: FsdDocsComponent;
  let fixture: ComponentFixture<FsdDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsdDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsdDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
