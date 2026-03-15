// ================================================
// transaction-list.component.spec.ts
// ================================================

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { Transaction } from '../../../../core/models/fund.model';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    type: 'subscription',
    amount: 75000,
    status: 'success',
    notificationMethod: 'email',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    fundId: 2,
    fundName: 'FPV_BTG_PACTUAL_ECOPETROL',
    type: 'cancellation',
    amount: 125000,
    status: 'success',
    notificationMethod: 'sms',
    createdAt: new Date().toISOString(),
  },
];

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;
  let fundServiceMock: jest.Mocked<Partial<FundService>>;
  let userServiceMock: jest.Mocked<Partial<UserService>>;

  beforeEach(async () => {
    fundServiceMock = {
      transactions: jest.fn().mockReturnValue(mockTransactions) as any,
      loading: jest.fn().mockReturnValue(false) as any,
    };

    userServiceMock = {
      balance: jest.fn().mockReturnValue(500000) as any,
      activeFunds: jest.fn().mockReturnValue([
        {
          fundId: 1,
          fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
          subscribedAmount: 75000,
          subscribedAt: new Date().toISOString(),
        },
      ]) as any,
    };

    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
      providers: [
        { provide: FundService, useValue: fundServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe mostrar la cantidad correcta de transacciones', () => {
    expect(component.transactionCount()).toBe(2);
  });

  it('debe calcular el total invertido correctamente', () => {
    expect(component.totalInvested()).toBe(75000);
  });
});
