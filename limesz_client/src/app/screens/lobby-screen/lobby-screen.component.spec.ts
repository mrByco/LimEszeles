import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyScreenComponent } from './lobby-screen.component';

describe('LobbyScreenComponent', () => {
  let component: LobbyScreenComponent;
  let fixture: ComponentFixture<LobbyScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LobbyScreenComponent]
    });
    fixture = TestBed.createComponent(LobbyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
