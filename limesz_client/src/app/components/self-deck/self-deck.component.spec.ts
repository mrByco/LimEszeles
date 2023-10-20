import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDeckComponent } from './self-deck.component';

describe('SelfDeckComponent', () => {
  let component: SelfDeckComponent;
  let fixture: ComponentFixture<SelfDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfDeckComponent]
    });
    fixture = TestBed.createComponent(SelfDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
