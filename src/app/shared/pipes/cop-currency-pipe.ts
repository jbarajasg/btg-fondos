import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copCurrency',
  standalone: true,
  pure: true,
})
export class CopCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined, showSymbol: boolean = true): string {
    if (value === null || value === undefined) {
      return showSymbol ? '$ 0' : '0';
    }
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return showSymbol ? `$ ${formatted}` : formatted;
  }
}
