export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  lots: Lot[];
}

export interface Lot {
  id: string;
  lotNumber: string;
  description: string;
  quantity: number;
  status: string;
  price: number;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// original types

export enum Status {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}
export interface GetOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
  dateFrom?: string;
  dateTo?: string;
}
