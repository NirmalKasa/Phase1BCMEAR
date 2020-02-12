import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsdDocsComponent } from './tsd-docs.component';

describe('TsdDocsComponent', () => {
  let component: TsdDocsComponent;
  let fixture: ComponentFixture<TsdDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsdDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsdDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
