import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeModalComponent } from './subscribe-modal.component';
import { Fund } from '../../../../core/models/fund.model';

const mockFund: Fund = {
  id: 1,
  name: 'FPV_BTG_PACTUAL_RECAUDADORA',
  minimumAmount: 75000,
  category: 'FPV',
};

describe('SubscribeModalComponent', () => {
  let component: SubscribeModalComponent;
  let fixture: ComponentFixture<SubscribeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribeModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('fund', mockFund);
    fixture.componentRef.setInput('userBalance', 500000);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe tener saldo suficiente cuando el balance supera el mínimo', () => {
    expect(component.hasSufficientBalance()).toBe(true);
  });

  it('debe detectar saldo insuficiente', () => {
    fixture.componentRef.setInput('userBalance', 50000);
    fixture.detectChanges();
    expect(component.hasSufficientBalance()).toBe(false);
  });

  it('debe calcular el saldo restante correctamente', () => {
    expect(component.remainingBalance()).toBe(425000);
  });

  it('debe iniciar con email como método de notificación', () => {
    expect(component.notificationControl.value).toBe('email');
  });

  it('debe emitir el método de notificación al confirmar', () => {
    let emitted: string | undefined;
    component.confirm.subscribe((method) => (emitted = method));

    component.notificationControl.setValue('sms');
    component.onConfirm();

    expect(emitted).toBe('sms');
  });

  it('no debe emitir confirm si no hay saldo suficiente', () => {
    fixture.componentRef.setInput('userBalance', 10000);
    fixture.detectChanges();

    let emitted = false;
    component.confirm.subscribe(() => (emitted = true));
    component.onConfirm();

    expect(emitted).toBe(false);
  });

  it('debe emitir close al hacer click en cancelar', () => {
    let emitted = false;
    component.close.subscribe(() => (emitted = true));
    component.onClose();
    expect(emitted).toBe(true);
  });
});
