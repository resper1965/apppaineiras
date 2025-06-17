
declare module '@env' {
  export const API_URL: string;
  export const NOTION_TOKEN: string;
  export const NOTION_DATABASE_ID: string;
}

// Common interfaces
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
}

export interface Appointment extends BaseEntity {
  title: string;
  date: string;
  time: string;
  doctor: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface FinancialItem extends BaseEntity {
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
