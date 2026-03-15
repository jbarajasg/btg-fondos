import { Fund, User, Transaction } from '../models/fund.model';

export const FUNDS_MOCK: Fund[] = [
  {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minimumAmount: 75000,
    category: 'FPV',
  },
  {
    id: 2,
    name: 'FPV_BTG_PACTUAL_ECOPETROL',
    minimumAmount: 125000,
    category: 'FPV',
  },
  {
    id: 3,
    name: 'DEUDA PRIVADA',
    minimumAmount: 50000,
    category: 'FIC',
  },
  {
    id: 4,
    name: 'FDO-ACCIONES',
    minimumAmount: 250000,
    category: 'FIC',
  },
  {
    id: 5,
    name: 'FPV_BTG_PACTUAL_DINAMICA',
    minimumAmount: 100000,
    category: 'FPV',
  },
];

export const USER_MOCK: User = {
  id: 1,
  name: 'Diomedes Díaz',
  email: 'diomedes.diaz@email.com',
  phone: '+57 300 123 4567',
  balance: 500000,
  activeFunds: [],
  notificationMethod: 'email',
};

export const TRANSACTIONS_MOCK: Transaction[] = [];
