export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string | null;
          id: string;
          name?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
        };
      };
      records: {
        Row: {
          created_at: string;
          dia: number;
          id: string;
          pulse: number;
          sys: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          dia: number;
          id?: string;
          pulse: number;
          sys: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          dia?: number;
          id?: string;
          pulse?: number;
          sys?: number;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
