import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { ActiveFund } from '../../../core/models/fund.model';
import { UserService } from '../../../core/services/user.service';

const mockActiveFund: ActiveFund = {
  fundId: 1,
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  subscribedAmount: 75000,
  subscribedAt: new Date().toISOString(),
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const balanceSignal = signal<number>(500000);
  const activeFundsSignal = signal<ActiveFund[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            balance: balanceSignal,
            activeFunds: activeFundsSignal,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    balanceSignal.set(500000);
    activeFundsSignal.set([]);
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeDefined();
  });

  it('debe mostrar 3 links de navegación', () => {
    expect(component.navLinks.length).toBe(3);
  });

  it('debe mostrar el saldo del usuario', () => {
    expect(component.balance()).toBe(500000);
  });

  it('debe mostrar la cantidad de fondos activos', () => {
    activeFundsSignal.set([mockActiveFund]);
    fixture.detectChanges();
    expect(component.activeFundsCount()).toBe(1);
  });

  it('debe mostrar 0 fondos activos cuando no hay ninguno', () => {
    expect(component.activeFundsCount()).toBe(0);
  });
});
