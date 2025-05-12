export interface Party {
  id: number;
  gstin_no: string;
  company_id: number;
  name: string;
  email: string | null;
  personal_phone: string | null;
  office_phone: string | null;
  logo: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}