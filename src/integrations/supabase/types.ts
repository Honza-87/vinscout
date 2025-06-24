export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          permissions: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          permissions?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          permissions?: Json
        }
        Relationships: []
      }
      admin_user_roles: {
        Row: {
          admin_role_id: string
          admin_user_id: string
          assigned_at: string
          assigned_by: string | null
          id: string
        }
        Insert: {
          admin_role_id: string
          admin_user_id: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
        }
        Update: {
          admin_role_id?: string
          admin_user_id?: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_user_roles_admin_role_id_fkey"
            columns: ["admin_role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_user_roles_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      claim_documents: {
        Row: {
          claim_id: string
          document_type_id: string
          file_name: string
          file_path: string
          file_size: number | null
          generation_data: Json | null
          id: string
          is_generated: boolean | null
          mime_type: string | null
          sms_signature_id: string | null
          uploaded_at: string
          uploaded_by_user: boolean | null
        }
        Insert: {
          claim_id: string
          document_type_id: string
          file_name: string
          file_path: string
          file_size?: number | null
          generation_data?: Json | null
          id?: string
          is_generated?: boolean | null
          mime_type?: string | null
          sms_signature_id?: string | null
          uploaded_at?: string
          uploaded_by_user?: boolean | null
        }
        Update: {
          claim_id?: string
          document_type_id?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          generation_data?: Json | null
          id?: string
          is_generated?: boolean | null
          mime_type?: string | null
          sms_signature_id?: string | null
          uploaded_at?: string
          uploaded_by_user?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "claim_documents_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claim_document_completeness"
            referencedColumns: ["claim_id"]
          },
          {
            foreignKeyName: "claim_documents_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "insurance_claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_documents_sms_signature_id_fkey"
            columns: ["sms_signature_id"]
            isOneToOne: false
            referencedRelation: "sms_signatures"
            referencedColumns: ["id"]
          },
        ]
      }
      document_types: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_required: boolean | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_required?: boolean | null
          name?: string
        }
        Relationships: []
      }
      insurance_claims: {
        Row: {
          claim_number: string | null
          created_at: string
          email: string
          estimated_damage: string | null
          event_date: string
          event_description: string
          event_location: string
          event_time: string | null
          event_witnesses: string | null
          first_name: string
          gdpr_consent: boolean
          id: string
          insurance_company: string
          insurance_type: string
          last_name: string
          last_updated_field: string | null
          payment_status: string | null
          payment_timestamp: string | null
          phone: string
          police_investigation: string | null
          policy_number: string
          selected_pricing_option: string | null
          status: string | null
          updated_at: string
          witness_name: string | null
        }
        Insert: {
          claim_number?: string | null
          created_at?: string
          email: string
          estimated_damage?: string | null
          event_date: string
          event_description: string
          event_location: string
          event_time?: string | null
          event_witnesses?: string | null
          first_name: string
          gdpr_consent?: boolean
          id?: string
          insurance_company: string
          insurance_type: string
          last_name: string
          last_updated_field?: string | null
          payment_status?: string | null
          payment_timestamp?: string | null
          phone: string
          police_investigation?: string | null
          policy_number: string
          selected_pricing_option?: string | null
          status?: string | null
          updated_at?: string
          witness_name?: string | null
        }
        Update: {
          claim_number?: string | null
          created_at?: string
          email?: string
          estimated_damage?: string | null
          event_date?: string
          event_description?: string
          event_location?: string
          event_time?: string | null
          event_witnesses?: string | null
          first_name?: string
          gdpr_consent?: boolean
          id?: string
          insurance_company?: string
          insurance_type?: string
          last_name?: string
          last_updated_field?: string | null
          payment_status?: string | null
          payment_timestamp?: string | null
          phone?: string
          police_investigation?: string | null
          policy_number?: string
          selected_pricing_option?: string | null
          status?: string | null
          updated_at?: string
          witness_name?: string | null
        }
        Relationships: []
      }
      sms_signatures: {
        Row: {
          attempts_count: number | null
          claim_id: string
          code_sent_at: string
          code_verified_at: string | null
          created_at: string
          document_type: string
          expires_at: string
          id: string
          is_verified: boolean | null
          phone_number: string
          verification_code: string
        }
        Insert: {
          attempts_count?: number | null
          claim_id: string
          code_sent_at?: string
          code_verified_at?: string | null
          created_at?: string
          document_type: string
          expires_at?: string
          id?: string
          is_verified?: boolean | null
          phone_number: string
          verification_code: string
        }
        Update: {
          attempts_count?: number | null
          claim_id?: string
          code_sent_at?: string
          code_verified_at?: string | null
          created_at?: string
          document_type?: string
          expires_at?: string
          id?: string
          is_verified?: boolean | null
          phone_number?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_signatures_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claim_document_completeness"
            referencedColumns: ["claim_id"]
          },
          {
            foreignKeyName: "sms_signatures_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "insurance_claims"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      claim_document_completeness: {
        Row: {
          claim_id: string | null
          first_name: string | null
          last_name: string | null
          missing_document_types: string[] | null
          status: string | null
          total_document_types: number | null
          uploaded_document_types: string[] | null
          uploaded_documents: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_admin_permission: {
        Args: { _admin_user_id: string; _permission: string }
        Returns: boolean
      }
      check_or_create_admin_user: {
        Args: { p_username: string; p_email: string; p_password: string }
        Returns: Json
      }
      get_admin_claims_overview: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_claims: number
          recent_claims: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
