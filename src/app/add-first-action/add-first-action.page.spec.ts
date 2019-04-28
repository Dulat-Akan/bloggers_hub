import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirstActionPage } from './add-first-action.page';

describe('AddFirstActionPage', () => {
  let component: AddFirstActionPage;
  let fixture: ComponentFixture<AddFirstActionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirstActionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirstActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
