import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtmDocsComponent } from './rtm-docs.component';

describe('RtmDocsComponent', () => {
  let component: RtmDocsComponent;
  let fixture: ComponentFixture<RtmDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtmDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtmDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
