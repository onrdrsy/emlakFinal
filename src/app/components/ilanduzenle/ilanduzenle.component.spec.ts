/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IlanduzenleComponent } from './ilanduzenle.component';

describe('IlanduzenleComponent', () => {
  let component: IlanduzenleComponent;
  let fixture: ComponentFixture<IlanduzenleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlanduzenleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlanduzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
