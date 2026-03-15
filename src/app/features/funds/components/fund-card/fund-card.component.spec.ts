import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundCardComponent } from './fund-card.component';
import { Fund } from '../../../../core/models/fund.model';

const MOCK_FUND: Fund = {
  id: 1,
  name: 'FPV_BTG_PACTUAL_RECAUDADORA',
  minimumAmount: 75000,
  category: 'FPV',
};

describe('FundCardComponent', () => {
  let component: FundCardComponent;
  let fixture: ComponentFixture<FundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FundCardComponent);
    component = fixture.componentInstance;

    // Establecemos el input requerido antes de cada test
    fixture.componentRef.setInput('fund', MOCK_FUND);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe mostrar el nombre del fondo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(MOCK_FUND.name);
  });

  it('debe mostrar el badge con la categoría FPV', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.badge');
    expect(badge?.textContent?.trim()).toBe('FPV');
  });

  it('debe aplicar la clase badge-fpv para fondos FPV', () => {
    expect(component.badgeClass()).toBe('badge-fpv');
  });

  it('debe aplicar la clase badge-fic para fondos FIC', () => {
    const ficFund: Fund = { ...MOCK_FUND, category: 'FIC' };
    fixture.componentRef.setInput('fund', ficFund);
    fixture.detectChanges();
    expect(component.badgeClass()).toBe('badge-fic');
  });

  it('debe mostrar el botón Suscribirse cuando no está suscrito', () => {
    fixture.componentRef.setInput('isSubscribed', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Suscribirse');
  });

  it('debe mostrar el botón Cancelar cuando está suscrito', () => {
    fixture.componentRef.setInput('isSubscribed', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Cancelar suscripción');
  });

  it('debe emitir el evento subscribe al hacer click en Suscribirse', () => {
    fixture.componentRef.setInput('isSubscribed', false);
    fixture.detectChanges();

    // Espiamos el output para verificar que se emite
    let emittedFund: Fund | undefined;
    component.subscribe.subscribe((fund: Fund) => (emittedFund = fund));

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(emittedFund).toEqual(MOCK_FUND);
  });

  it('debe emitir el evento cancel al hacer click en Cancelar', () => {
    fixture.componentRef.setInput('isSubscribed', true);
    fixture.detectChanges();

    let emittedFund: Fund | undefined;
    component.cancel.subscribe((fund: Fund) => (emittedFund = fund));

    const button = fixture.nativeElement.querySelector('button');
    button?.click();

    expect(emittedFund).toEqual(MOCK_FUND);
  });

  it('debe deshabilitar el botón cuando isLoading es true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBe(true);
  });
});
