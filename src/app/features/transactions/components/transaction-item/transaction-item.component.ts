// ================================================
// transaction-item.component.ts
// Componente DUMB — muestra una transacción
// ================================================

import { Component, input, computed } from '@angular/core';
import { Transaction } from '../../../../core/models/fund.model';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CopCurrencyPipe],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  transaction = input.required<Transaction>();

  // Computed para los estilos según el tipo de transacción
  isSubscription = computed(() => this.transaction().type === 'subscription');

  amountClass = computed(() => (this.isSubscription() ? 'text-red-600' : 'text-green-600'));

  amountPrefix = computed(() => (this.isSubscription() ? '-' : '+'));

  typeLabel = computed(() => (this.isSubscription() ? 'Suscripción' : 'Cancelación'));

  badgeClass = computed(() =>
    this.isSubscription() ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700',
  );

  // Formatea la fecha en español
  formattedDate = computed(() => {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(this.transaction().createdAt));
  });
}
