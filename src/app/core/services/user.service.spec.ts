// ================================================
// user.service.spec.ts
// Pruebas unitarias del UserService
// ================================================

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // Antes de cada prueba se crea una instancia limpia del servicio
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe iniciar con saldo de $500.000', () => {
    expect(service.balance()).toBe(500000);
  });

  it('debe iniciar con lista de fondos activos vacía', () => {
    expect(service.activeFunds()).toEqual([]);
  });

  it('debe descontar el saldo correctamente', () => {
    service.deductBalance(75000);
    expect(service.balance()).toBe(425000);
  });

  it('debe restaurar el saldo correctamente', () => {
    service.deductBalance(75000);
    service.restoreBalance(75000);
    expect(service.balance()).toBe(500000);
  });

  it('debe agregar un fondo activo', () => {
    const activeFund = {
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      subscribedAmount: 75000,
      subscribedAt: new Date().toISOString()
    };

    service.addActiveFund(activeFund);
    expect(service.activeFunds().length).toBe(1);
    expect(service.activeFunds()[0].fundId).toBe(1);
  });

  it('debe eliminar un fondo activo', () => {
    const activeFund = {
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      subscribedAmount: 75000,
      subscribedAt: new Date().toISOString()
    };

    service.addActiveFund(activeFund);
    service.removeActiveFund(1);
    expect(service.activeFunds()).toEqual([]);
  });

  it('debe retornar true si el usuario está suscrito a un fondo', () => {
    const activeFund = {
      fundId: 2,
      fundName: 'FPV_BTG_PACTUAL_ECOPETROL',
      subscribedAmount: 125000,
      subscribedAt: new Date().toISOString()
    };

    service.addActiveFund(activeFund);
   expect(service.isSubscribed(2)).toBe(true);
  });

  it('debe retornar false si el usuario no está suscrito a un fondo', () => {
   expect(service.isSubscribed(99)).toBe(false);
  });

  it('debe retornar true si tiene saldo suficiente', () => {
    expect(service.hasSufficientBalance(250000)).toBe(true);
  });

  it('debe retornar false si no tiene saldo suficiente', () => {
    expect(service.hasSufficientBalance(600000)).toBe(false);
  });
});