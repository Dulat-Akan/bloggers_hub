import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectrolePage } from './selectrole.page';

describe('SelectrolePage', () => {
  let component: SelectrolePage;
  let fixture: ComponentFixture<SelectrolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectrolePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectrolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
