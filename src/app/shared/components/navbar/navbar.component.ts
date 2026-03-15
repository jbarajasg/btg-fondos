import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CopCurrencyPipe } from '../../pipes/cop-currency-pipe';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CopCurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private userService = inject(UserService);

  balance = computed(() => this.userService.balance());
  activeFundsCount = computed(() => this.userService.activeFunds().length);

  userName = computed(() => this.userService.user().name);

  userInitial = computed(() => this.userService.user().name.charAt(0).toUpperCase());

  navLinks = [
    { path: '/funds', label: 'Fondos', icon: '📈' },
    { path: '/portfolio', label: 'Mi portafolio', icon: '💼' },
    { path: '/transactions', label: 'Historial', icon: '📋' },
  ];
}
