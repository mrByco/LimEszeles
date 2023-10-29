import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InGamePlayerListComponent } from './in-game-player-list.component';

describe('InGamePlayerListComponent', () => {
  let component: InGamePlayerListComponent;
  let fixture: ComponentFixture<InGamePlayerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InGamePlayerListComponent]
    });
    fixture = TestBed.createComponent(InGamePlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
