import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDocsComponent } from './test-docs.component';

describe('TestDocsComponent', () => {
  let component: TestDocsComponent;
  let fixture: ComponentFixture<TestDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
