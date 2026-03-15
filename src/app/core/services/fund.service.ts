import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  Fund,
  Transaction,
  SubscribeFundDto,
  CancelFundDto,
  ActiveFund,
} from '../models/fund.model';
import { FUNDS_MOCK, TRANSACTIONS_MOCK } from '../mocks/funds.mock';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class FundService {
  private userService = inject(UserService);

  private _funds = signal<Fund[]>(FUNDS_MOCK);
  private _transactions = signal<Transaction[]>([...TRANSACTIONS_MOCK]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly funds = computed(() => this._funds());
  readonly transactions = computed(() => this._transactions());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  readonly availableFunds = computed(() => {
    const activeFundIds = this.userService.activeFunds().map((f) => f.fundId);
    return this._funds().filter((f) => !activeFundIds.includes(f.id));
  });

  getFunds(): Observable<Fund[]> {
    this._loading.set(true);
    this._error.set(null);

    return of(FUNDS_MOCK).pipe(
      delay(800),
      tap({
        next: (funds) => {
          this._funds.set(funds);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error al cargar los fondos');
          this._loading.set(false);
        },
      }),
    );
  }

  subscribeFund(dto: SubscribeFundDto): Observable<Transaction> {
    const fund = this._funds().find((f) => f.id === dto.fundId);

    if (!fund) {
      return throwError(() => new Error('Fondo no encontrado'));
    }

    if (this.userService.isSubscribed(dto.fundId)) {
      return throwError(() => new Error('Ya estás suscrito a este fondo'));
    }

    if (!this.userService.hasSufficientBalance(fund.minimumAmount)) {
      return throwError(
        () => new Error(`No tiene saldo suficiente para vincularse al fondo ${fund.name}`),
      );
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      fundId: fund.id,
      fundName: fund.name,
      type: 'subscription',
      amount: fund.minimumAmount,
      status: 'success',
      notificationMethod: dto.notificationMethod,
      createdAt: new Date().toISOString(),
    };

    const activeFund: ActiveFund = {
      fundId: fund.id,
      fundName: fund.name,
      subscribedAmount: fund.minimumAmount,
      subscribedAt: new Date().toISOString(),
    };

    this._loading.set(true);

    return of(transaction).pipe(
      delay(1000),
      tap(() => {
        this.userService.deductBalance(fund.minimumAmount);
        this.userService.addActiveFund(activeFund);
        this.userService.updateNotificationMethod(dto.notificationMethod);

        this._transactions.update((txs) => [transaction, ...txs]);
        this._loading.set(false);
      }),
    );
  }

  cancelFund(dto: CancelFundDto): Observable<Transaction> {
    const activeFund = this.userService.activeFunds().find((f) => f.fundId === dto.fundId);

    if (!activeFund) {
      return throwError(() => new Error('No estás suscrito a este fondo'));
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      fundId: activeFund.fundId,
      fundName: activeFund.fundName,
      type: 'cancellation',
      amount: activeFund.subscribedAmount,
      status: 'success',
      notificationMethod: this.userService.notificationMethod(),
      createdAt: new Date().toISOString(),
    };

    this._loading.set(true);

    return of(transaction).pipe(
      delay(1000),
      tap(() => {
        this.userService.restoreBalance(activeFund.subscribedAmount);
        this.userService.removeActiveFund(dto.fundId);

        this._transactions.update((txs) => [transaction, ...txs]);
        this._loading.set(false);
      }),
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this._transactions()).pipe(delay(500));
  }
}
