import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequestPage } from './myrequest.page';

describe('MyrequestPage', () => {
  let component: MyrequestPage;
  let fixture: ComponentFixture<MyrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
