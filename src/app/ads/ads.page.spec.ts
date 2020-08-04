import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPage } from './ads.page';

describe('AdsPage', () => {
  let component: AdsPage;
  let fixture: ComponentFixture<AdsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
