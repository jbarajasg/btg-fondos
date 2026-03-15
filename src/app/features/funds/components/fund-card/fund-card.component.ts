import { Component, input, output, computed } from '@angular/core';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { Fund } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-fund-card',
  standalone: true,
  imports: [CopCurrencyPipe],
  templateUrl: './fund-card.component.html',
  styleUrl: './fund-card.component.scss',
})
export class FundCardComponent {
  fund = input.required<Fund>();
  isSubscribed = input<boolean>(false);
  isLoading = input<boolean>(false);

  subscribe = output<Fund>();
  cancel = output<Fund>();

  badgeClass = computed(() => (this.fund().category === 'FPV' ? 'badge-fpv' : 'badge-fic'));

  onSubscribe(): void {
    this.subscribe.emit(this.fund());
  }

  onCancel(): void {
    this.cancel.emit(this.fund());
  }
}
