import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectlanguagePage } from './selectlanguage.page';

describe('SelectlanguagePage', () => {
  let component: SelectlanguagePage;
  let fixture: ComponentFixture<SelectlanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectlanguagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectlanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
