import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarbreadcrumbComponent } from './earbreadcrumb.component';

describe('EarbreadcrumbComponent', () => {
  let component: EarbreadcrumbComponent;
  let fixture: ComponentFixture<EarbreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarbreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarbreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
