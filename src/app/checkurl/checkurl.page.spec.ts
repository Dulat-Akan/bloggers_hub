import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckurlPage } from './checkurl.page';

describe('CheckurlPage', () => {
  let component: CheckurlPage;
  let fixture: ComponentFixture<CheckurlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckurlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckurlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
