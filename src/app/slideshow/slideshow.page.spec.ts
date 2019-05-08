import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowPage } from './slideshow.page';

describe('SlideshowPage', () => {
  let component: SlideshowPage;
  let fixture: ComponentFixture<SlideshowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
