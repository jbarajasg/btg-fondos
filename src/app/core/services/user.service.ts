import { Injectable, signal, computed } from '@angular/core';
import { User, ActiveFund, NotificationMethod } from '../models/fund.model';
import { USER_MOCK } from '../mocks/funds.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = signal<User>({ ...USER_MOCK });

  readonly balance = computed(() => this._user().balance);

  readonly activeFunds = computed(() => this._user().activeFunds);

  readonly notificationMethod = computed(() => this._user().notificationMethod);
  readonly user = computed(() => this._user());

  deductBalance(amount: number): void {
    this._user.update((user) => ({
      ...user,
      balance: user.balance - amount,
    }));
  }

  restoreBalance(amount: number): void {
    this._user.update((user) => ({
      ...user,
      balance: user.balance + amount,
    }));
  }

  addActiveFund(fund: ActiveFund): void {
    this._user.update((user) => ({
      ...user,
      activeFunds: [...user.activeFunds, fund],
    }));
  }

  removeActiveFund(fundId: number): void {
    this._user.update((user) => ({
      ...user,
      activeFunds: user.activeFunds.filter((f) => f.fundId !== fundId),
    }));
  }

  updateNotificationMethod(method: NotificationMethod): void {
    this._user.update((user) => ({
      ...user,
      notificationMethod: method,
    }));
  }

  isSubscribed(fundId: number): boolean {
    return this._user().activeFunds.some((f) => f.fundId === fundId);
  }

  hasSufficientBalance(amount: number): boolean {
    return this._user().balance >= amount;
  }
}
