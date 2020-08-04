import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpagePage } from './workpage.page';

describe('WorkpagePage', () => {
  let component: WorkpagePage;
  let fixture: ComponentFixture<WorkpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
