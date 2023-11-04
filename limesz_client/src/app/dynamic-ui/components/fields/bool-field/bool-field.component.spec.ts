import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoolFieldComponent } from './bool-field.component';

describe('BoolFieldComponent', () => {
  let component: BoolFieldComponent;
  let fixture: ComponentFixture<BoolFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoolFieldComponent]
    });
    fixture = TestBed.createComponent(BoolFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
