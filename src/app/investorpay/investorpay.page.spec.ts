import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorpayPage } from './investorpay.page';

describe('InvestorpayPage', () => {
  let component: InvestorpayPage;
  let fixture: ComponentFixture<InvestorpayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorpayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
