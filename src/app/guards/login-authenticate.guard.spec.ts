import { TestBed } from '@angular/core/testing';

import { LoginAuthenticateGuard } from './login-authenticate.guard';

describe('LoginAuthenticateGuard', () => {
  let guard: LoginAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
