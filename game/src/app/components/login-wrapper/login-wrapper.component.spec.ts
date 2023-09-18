import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWrapper } from './login-wrapper.component';

describe('LoginScreenComponent', () => {
  let component: LoginWrapper;
  let fixture: ComponentFixture<LoginWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginWrapper]
    });
    fixture = TestBed.createComponent(LoginWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
