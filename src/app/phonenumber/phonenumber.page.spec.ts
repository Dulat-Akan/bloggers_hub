import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonenumberPage } from './phonenumber.page';

describe('PhonenumberPage', () => {
  let component: PhonenumberPage;
  let fixture: ComponentFixture<PhonenumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonenumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonenumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
