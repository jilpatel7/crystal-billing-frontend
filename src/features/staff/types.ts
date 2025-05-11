export interface StaffMember {
  id: number;
  address: string;
  age: number;
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  primary_phone: string;
  secondary_phone: string | null;
  created_at: string;
  updated_at: string;
}
