import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRootComponent } from './menu-root.component';

describe('MenuRootComponent', () => {
  let component: MenuRootComponent;
  let fixture: ComponentFixture<MenuRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRootComponent]
    });
    fixture = TestBed.createComponent(MenuRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
