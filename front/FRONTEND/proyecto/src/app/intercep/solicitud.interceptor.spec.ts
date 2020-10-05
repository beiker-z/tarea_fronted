import { TestBed } from '@angular/core/testing';

import { SolicitudInterceptor } from './solicitud.interceptor';

describe('SolicitudInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SolicitudInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SolicitudInterceptor = TestBed.inject(SolicitudInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
