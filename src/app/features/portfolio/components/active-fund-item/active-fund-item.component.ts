// ================================================
// active-fund-item.component.ts
// Componente DUMB — muestra un fondo activo
// en el que el usuario está suscrito
// ================================================

import { Component, input, output, computed } from '@angular/core';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { ActiveFund } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-active-fund-item',
  standalone: true,
  imports: [CopCurrencyPipe],
  templateUrl: './active-fund-item.component.html',
  styleUrl: './active-fund-item.component.scss',
})
export class ActiveFundItemComponent {
  // ── Inputs ────────────────────────────────────
  activeFund = input.required<ActiveFund>();
  isLoading = input<boolean>(false);

  // ── Outputs ───────────────────────────────────
  cancel = output<ActiveFund>();

  // ── Computed ──────────────────────────────────
  // Formatea la fecha de suscripción
  subscribedDate = computed(() =>
    new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(this.activeFund().subscribedAt)),
  );

  onCancel(): void {
    this.cancel.emit(this.activeFund());
  }
}
