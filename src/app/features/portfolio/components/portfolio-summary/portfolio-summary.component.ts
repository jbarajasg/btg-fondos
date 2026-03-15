import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveFundItemComponent } from '../active-fund-item/active-fund-item.component';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';
import { ActiveFund } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [ActiveFundItemComponent, CopCurrencyPipe],
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.scss',
})
export class PortfolioSummaryComponent {
  fundService = inject(FundService);
  userService = inject(UserService);
  private router = inject(Router);

  loadingFundId = signal<number | null>(null);

  message = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  totalInvested = computed(() =>
    this.userService.activeFunds().reduce((acc, fund) => acc + fund.subscribedAmount, 0),
  );

  investedPercentage = computed(() => {
    const total = this.userService.balance() + this.totalInvested();
    return total > 0 ? Math.round((this.totalInvested() / total) * 100) : 0;
  });

  isLoadingFund(fundId: number): boolean {
    return this.loadingFundId() === fundId;
  }

  onCancel(activeFund: ActiveFund): void {
    this.loadingFundId.set(activeFund.fundId);
    this.message.set(null);

    this.fundService.cancelFund({ fundId: activeFund.fundId }).subscribe({
      next: () => {
        this.loadingFundId.set(null);
        this.message.set({
          text: `Cancelaste tu suscripción a ${activeFund.fundName}`,
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

  goToFunds(): void {
    this.router.navigate(['/fondos']);
  }
}
