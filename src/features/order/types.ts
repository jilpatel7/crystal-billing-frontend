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

export enum OrderStatus {
  PENDING = 'PENDING',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

// Party type (for dropdown options)
export interface Party {
  id: string;
  name: string;
}

// Staff type (for dropdown options)
export interface Staff {
  id: string;
  name: string;
  role?: string;
}

// Order detail entry (for each lot)
export interface OrderDetail {
  no_of_diamonds: number | undefined;
  price_per_caret: number | undefined;
  total_caret: number | undefined;
  status: string;
}

// Complete form values
export interface OrderFormValues {
  party_id: string;
  no_of_lots: number;
  jagad_no: string;
  received_at?: Date | null;
  delivered_at?: Date | null;          
  delivered_by?: string;               
  order_details: OrderDetail[];
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
