import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcabinetPage } from './ocabinet.page';

describe('OcabinetPage', () => {
  let component: OcabinetPage;
  let fixture: ComponentFixture<OcabinetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcabinetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcabinetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
