export type FundCategory = 'FPV' | 'FIC';
export type NotificationMethod = 'email' | 'sms';
export type TransactionType = 'subscription' | 'cancellation';
export type TransactionStatus = 'success' | 'failed';

// Fondo
export interface Fund {
  id: number;
  name: string;
  minimumAmount: number;
  category: FundCategory;
}

// Usuario
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  activeFunds: ActiveFund[];
  notificationMethod: NotificationMethod;
}

// Fondo activo — el fondo que el usuario tiene suscrito
export interface ActiveFund {
  fundId: number;
  fundName: string;
  subscribedAmount: number;
  subscribedAt: string;
}

// Transacción
export interface Transaction {
  id: string;
  fundId: number;
  fundName: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  notificationMethod: NotificationMethod;
  createdAt: string;
}

// Lo que enviamos al "API" al suscribirse
export interface SubscribeFundDto {
  fundId: number;
  notificationMethod: NotificationMethod;
}

// Lo que enviamos al cancelar
export interface CancelFundDto {
  fundId: number;
}

// Para manejar el estado de carga y errores en la UI
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
