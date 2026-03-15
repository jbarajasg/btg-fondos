// ================================================
// transaction-list.component.ts
// Componente SMART — muestra el historial completo
// de transacciones del usuario
// ================================================

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

  // Total invertido — suma de todas las suscripciones activas
  totalInvested = computed(() =>
    this.userService.activeFunds().reduce((acc, fund) => acc + fund.subscribedAmount, 0),
  );

  // Cantidad de transacciones en el historial
  transactionCount = computed(() => this.fundService.transactions().length);
}
