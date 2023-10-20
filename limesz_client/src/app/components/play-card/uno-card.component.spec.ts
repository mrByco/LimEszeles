import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCardComponent } from './uno-card.component';

describe('PlayCardComponent', () => {
  let component: PlayCardComponent;
  let fixture: ComponentFixture<PlayCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayCardComponent]
    });
    fixture = TestBed.createComponent(PlayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
