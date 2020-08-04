import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsPage } from './instructions.page';

describe('InstructionsPage', () => {
  let component: InstructionsPage;
  let fixture: ComponentFixture<InstructionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
