import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCardsComponent } from './my-cards.component';

describe('SelfDeckComponent', () => {
  let component: MyCardsComponent;
  let fixture: ComponentFixture<MyCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCardsComponent]
    });
    fixture = TestBed.createComponent(MyCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
