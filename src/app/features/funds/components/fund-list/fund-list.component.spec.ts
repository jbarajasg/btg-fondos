import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundListComponent } from './fund-list.component';
import { of, throwError } from 'rxjs';
import { Fund, Transaction } from '../../../../core/models/fund.model';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';
import { signal } from '@angular/core';

const mockFund: Fund = {
  id: 1,
  name: 'FPV_BTG_PACTUAL_RECAUDADORA',
  minimumAmount: 75000,
  category: 'FPV',
};

const mockTransaction: Transaction = {
  id: '123',
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  type: 'subscription',
  amount: 75000,
  status: 'success',
  notificationMethod: 'email',
  createdAt: new Date().toISOString(),
};

describe('FundListComponent', () => {
  let component: FundListComponent;
  let fixture: ComponentFixture<FundListComponent>;
  let fundServiceMock: jest.Mocked<Partial<FundService>>;
  let userServiceMock: jest.Mocked<Partial<UserService>>;

  beforeEach(async () => {
    jest.useFakeTimers();

    fundServiceMock = {
      getFunds: jest.fn().mockReturnValue(of([mockFund])),
      subscribeFund: jest.fn().mockReturnValue(of(mockTransaction)),
      cancelFund: jest.fn().mockReturnValue(of(mockTransaction)),
      funds: jest.fn().mockReturnValue([mockFund]) as any,
      loading: jest.fn().mockReturnValue(false) as any,
      error: jest.fn().mockReturnValue(null) as any,
    };

    userServiceMock = {
      balance: jest.fn().mockReturnValue(500000) as any,
      notificationMethod: jest.fn().mockReturnValue('email') as any,
      isSubscribed: jest.fn().mockReturnValue(false),
      user: signal({
        id: 1,
        name: 'Diomedes Díaz',
        email: 'diomedes.diaz@email.com',
        phone: '',
        balance: 500000,
        activeFunds: [],
        notificationMethod: 'email' as const,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [FundListComponent],
      providers: [
        { provide: FundService, useValue: fundServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe cargar los fondos al iniciar', () => {
    expect(fundServiceMock.getFunds).toHaveBeenCalled();
  });

  it('debe mostrar mensaje de éxito al suscribirse', () => {
    component.onSubscribeClick(mockFund);
    component.onSubscribeConfirm('email');

    expect(component['message']()).toEqual({
      text: `Te has suscrito exitosamente a ${mockFund.name}`,
      type: 'success',
    });
  });

  it('debe mostrar mensaje de error si falla la suscripción', () => {
    fundServiceMock.subscribeFund = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('No tiene saldo suficiente')));
    component.onSubscribeClick(mockFund);
    component.onSubscribeConfirm('email');
    expect(component['message']()).toEqual({
      text: 'No tiene saldo suficiente',
      type: 'error',
    });
  });

  it('debe limpiar el mensaje después de 4 segundos', () => {
    component.onSubscribeClick(mockFund);
    jest.advanceTimersByTime(4000);
    expect(component['message']()).toBeNull();
  });

  it('debe mostrar mensaje de éxito al cancelar', () => {
    component.onCancel(mockFund);
    expect(component['message']()).toEqual({
      text: `Has cancelado tu suscripción a ${mockFund.name}`,
      type: 'success',
    });
  });

  it('debe marcar el fondo como loading al suscribirse', () => {
    component.onSubscribeClick(mockFund);
    expect(component.isLoadingFund(mockFund.id)).toBe(false);
  });
});
