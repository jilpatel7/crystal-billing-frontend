import { Party } from "../party/types";

export interface Lot {
  id: number;
  order_id: number;
  no_of_diamonds: number;
  total_caret: number;
  status: string;
  price_per_caret: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Order {
  id: number;
  party_id: number;
  company_id: number;
  no_of_lots: number;
  jagad_no: string;
  received_at: string;
  delivered_at: string | null;
  delivered_by: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  order_details: Lot[];
  party: Party;
}

export interface OrderResponse {
  data: Order[];
}


export interface DateRange {
  from: Date | null;
  to: Date | null;
}

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
  status?: Status | null;
}
