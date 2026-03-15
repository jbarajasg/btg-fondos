// ================================================
// portfolio-summary.component.spec.ts
// ================================================

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioSummaryComponent } from './portfolio-summary.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { ActiveFund, Transaction } from '../../../../core/models/fund.model';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';

const mockActiveFund: ActiveFund = {
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  subscribedAmount: 75000,
  subscribedAt: new Date().toISOString(),
};

const mockTransaction: Transaction = {
  id: '1',
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  type: 'cancellation',
  amount: 75000,
  status: 'success',
  notificationMethod: 'email',
  createdAt: new Date().toISOString(),
};

describe('PortfolioSummaryComponent', () => {
  let component: PortfolioSummaryComponent;
  let fixture: ComponentFixture<PortfolioSummaryComponent>;
  let fundServiceMock: jest.Mocked<Partial<FundService>>;
  let userServiceMock: jest.Mocked<Partial<UserService>>;
  let routerMock: jest.Mocked<Partial<Router>>;

  // Signals reutilizables entre tests
  const activeFundsSignal = signal<ActiveFund[]>([mockActiveFund]);
  const balanceSignal = signal<number>(425000);

  beforeEach(async () => {
    jest.useFakeTimers();

    fundServiceMock = {
      cancelFund: jest.fn().mockReturnValue(of(mockTransaction)),
    };

    userServiceMock = {
      activeFunds: activeFundsSignal,
      balance: balanceSignal,
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PortfolioSummaryComponent],
      providers: [
        { provide: FundService, useValue: fundServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
    activeFundsSignal.set([mockActiveFund]);
    balanceSignal.set(425000);
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe calcular el total invertido correctamente', () => {
    expect(component.totalInvested()).toBe(75000);
  });

  it('debe calcular el porcentaje invertido correctamente', () => {
    expect(component.investedPercentage()).toBe(15);
  });

  it('debe mostrar mensaje de éxito al cancelar', () => {
    component.onCancel(mockActiveFund);
    expect(component.message()).toEqual({
      text: `Cancelaste tu suscripción a ${mockActiveFund.fundName}`,
      type: 'success',
    });
  });

  it('debe mostrar mensaje de error si falla la cancelación', () => {
    fundServiceMock.cancelFund = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Error al cancelar')));
    component.onCancel(mockActiveFund);
    expect(component.message()).toEqual({
      text: 'Error al cancelar',
      type: 'error',
    });
  });

  it('debe limpiar el mensaje después de 4 segundos', () => {
    component.onCancel(mockActiveFund);
    jest.advanceTimersByTime(4000);
    expect(component.message()).toBeNull();
  });

  it('debe navegar a /funds al hacer click en ver fondos', () => {
    component.goToFunds();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/funds']);
  });

  it('debe mostrar 0% cuando no hay fondos activos', () => {
    activeFundsSignal.set([]);
    balanceSignal.set(500000);
    fixture.detectChanges();
    expect(component.investedPercentage()).toBe(0);
  });
});
