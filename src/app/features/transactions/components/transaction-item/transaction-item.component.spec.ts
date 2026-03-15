import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionItemComponent } from './transaction-item.component';
import { Transaction } from '../../../../core/models/fund.model';

const mockSubscription: Transaction = {
  id: '1',
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  type: 'subscription',
  amount: 75000,
  status: 'success',
  notificationMethod: 'email',
  createdAt: new Date().toISOString(),
};

const mockCancellation: Transaction = {
  ...mockSubscription,
  id: '2',
  type: 'cancellation',
};

describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('transaction', mockSubscription);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe detectar una suscripción correctamente', () => {
    expect(component.isSubscription()).toBe(true);
  });

  it('debe mostrar etiqueta Suscripción para tipo subscription', () => {
    expect(component.typeLabel()).toBe('Suscripción');
  });

  it('debe mostrar etiqueta Cancelación para tipo cancellation', () => {
    fixture.componentRef.setInput('transaction', mockCancellation);
    fixture.detectChanges();
    expect(component.typeLabel()).toBe('Cancelación');
  });

  it('debe mostrar prefijo negativo para suscripción', () => {
    expect(component.amountPrefix()).toBe('-');
  });

  it('debe mostrar prefijo positivo para cancelación', () => {
    fixture.componentRef.setInput('transaction', mockCancellation);
    fixture.detectChanges();
    expect(component.amountPrefix()).toBe('+');
  });

  it('debe aplicar color rojo para suscripción', () => {
    expect(component.amountClass()).toBe('text-red-600');
  });

  it('debe aplicar color verde para cancelación', () => {
    fixture.componentRef.setInput('transaction', mockCancellation);
    fixture.detectChanges();
    expect(component.amountClass()).toBe('text-green-600');
  });
});
