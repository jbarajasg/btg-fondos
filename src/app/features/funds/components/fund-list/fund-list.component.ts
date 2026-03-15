// ================================================
// fund-list.component.ts
// ================================================

import { Component, inject, OnInit, signal } from '@angular/core';
import { FundCardComponent } from '../fund-card/fund-card.component';
import { SubscribeModalComponent } from '../subscribe-modal/subscribe-modal.component';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';
import { Fund, NotificationMethod } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [FundCardComponent, SubscribeModalComponent, CopCurrencyPipe],
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
})
export class FundListComponent implements OnInit {
  fundService = inject(FundService);
  userService = inject(UserService);

  selectedFund = signal<Fund | null>(null);

  loadingFundId = signal<number | null>(null);
  message = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  ngOnInit(): void {
    this.fundService.getFunds().subscribe();
  }

  isLoadingFund(fundId: number): boolean {
    return this.loadingFundId() === fundId;
  }

  onSubscribeClick(fund: Fund): void {
    this.selectedFund.set(fund);
  }

  onSubscribeConfirm(notificationMethod: NotificationMethod): void {
    const fund = this.selectedFund();
    if (!fund) return;

    this.selectedFund.set(null);
    this.loadingFundId.set(fund.id);
    this.message.set(null);

    this.fundService
      .subscribeFund({
        fundId: fund.id,
        notificationMethod,
      })
      .subscribe({
        next: () => {
          this.loadingFundId.set(null);
          this.message.set({
            text: `Te has suscrito exitosamente a ${fund.name}`,
            type: 'success',
          });
          setTimeout(() => this.message.set(null), 4000);
        },
        error: (err: Error) => {
          this.loadingFundId.set(null);
          this.message.set({ text: err.message, type: 'error' });
          setTimeout(() => this.message.set(null), 4000);
        },
      });
  }

  onModalClose(): void {
    this.selectedFund.set(null);
  }

  onCancel(fund: Fund): void {
    this.loadingFundId.set(fund.id);
    this.message.set(null);

    this.fundService.cancelFund({ fundId: fund.id }).subscribe({
      next: () => {
        this.loadingFundId.set(null);
        this.message.set({
          text: `Has cancelado tu suscripción a ${fund.name}`,
          type: 'success',
        });
        setTimeout(() => this.message.set(null), 4000);
      },
      error: (err: Error) => {
        this.loadingFundId.set(null);
        this.message.set({ text: err.message, type: 'error' });
        setTimeout(() => this.message.set(null), 4000);
      },
    });
  }
}
