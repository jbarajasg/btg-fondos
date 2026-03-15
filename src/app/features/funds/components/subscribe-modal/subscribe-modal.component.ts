import { Component, input, output, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CopCurrencyPipe } from '../../../../shared/pipes/cop-currency-pipe';
import { Fund, NotificationMethod } from '../../../../core/models/fund.model';

@Component({
  selector: 'app-subscribe-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CopCurrencyPipe],
  templateUrl: './subscribe-modal.component.html',
  styleUrl: './subscribe-modal.component.scss',
})
export class SubscribeModalComponent {
  fund = input.required<Fund>();
  userBalance = input.required<number>();
  isLoading = input<boolean>(false);

  confirm = output<NotificationMethod>();
  close = output<void>();

  notificationControl = new FormControl<NotificationMethod>('email', {
    nonNullable: true,
    validators: [Validators.required],
  });

  hasSufficientBalance = computed(() => this.userBalance() >= this.fund().minimumAmount);

  remainingBalance = computed(() => this.userBalance() - this.fund().minimumAmount);

  onConfirm(): void {
    if (this.notificationControl.invalid || !this.hasSufficientBalance()) return;
    this.confirm.emit(this.notificationControl.value);
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
