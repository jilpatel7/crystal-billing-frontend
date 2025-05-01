export type OrderStatus = 'PENDING' | 'STARTED' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  total: number;
  lots: Lot[];
}

export interface Lot {
  id: string;
  lotNumber: string;
  description: string;
  quantity: number;
  status: OrderStatus;
  price: number;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}