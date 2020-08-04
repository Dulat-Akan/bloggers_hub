import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddataPage } from './carddata.page';

describe('CarddataPage', () => {
  let component: CarddataPage;
  let fixture: ComponentFixture<CarddataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
