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
