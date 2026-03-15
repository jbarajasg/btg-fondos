// ================================================
// active-fund-item.component.spec.ts
// ================================================

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveFundItemComponent } from './active-fund-item.component';
import { ActiveFund } from '../../../../core/models/fund.model';

const mockActiveFund: ActiveFund = {
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  subscribedAmount: 75000,
  subscribedAt: new Date('2026-01-15').toISOString(),
};

describe('ActiveFundItemComponent', () => {
  let component: ActiveFundItemComponent;
  let fixture: ComponentFixture<ActiveFundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveFundItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveFundItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activeFund', mockActiveFund);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe mostrar el nombre del fondo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(mockActiveFund.fundName);
  });

  it('debe formatear la fecha de suscripción', () => {
    expect(component.subscribedDate()).toBeTruthy();
  });

  it('debe emitir el evento cancel con el fondo activo', () => {
    let emitted: ActiveFund | undefined;
    component.cancel.subscribe((fund) => (emitted = fund));

    component.onCancel();

    expect(emitted).toEqual(mockActiveFund);
  });

  it('debe deshabilitar el botón cuando isLoading es true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBe(true);
  });
});
