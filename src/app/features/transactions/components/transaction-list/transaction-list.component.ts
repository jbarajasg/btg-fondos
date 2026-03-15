import { Component, inject, computed } from '@angular/core';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { FundService } from '../../../../core/services/fund.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TransactionItemComponent, CopCurrencyPipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  fundService = inject(FundService);
  userService = inject(UserService);

  totalInvested = computed(() =>
    this.userService.activeFunds().reduce((acc, fund) => acc + fund.subscribedAmount, 0),
  );

  transactionCount = computed(() => this.fundService.transactions().length);
}
