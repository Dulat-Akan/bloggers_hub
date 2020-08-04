import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmoneyPage } from './getmoney.page';

describe('GetmoneyPage', () => {
  let component: GetmoneyPage;
  let fixture: ComponentFixture<GetmoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetmoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
