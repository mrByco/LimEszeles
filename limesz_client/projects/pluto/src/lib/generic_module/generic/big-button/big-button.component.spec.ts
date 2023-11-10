import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigButtonComponent } from './big-button.component';

describe('BigButtonComponent', () => {
  let component: BigButtonComponent;
  let fixture: ComponentFixture<BigButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BigButtonComponent]
    });
    fixture = TestBed.createComponent(BigButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
