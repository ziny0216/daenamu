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
      comments: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          is_hidden: boolean
          post_id: string
          report_cnt: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          is_hidden?: boolean
          post_id?: string
          report_cnt?: number
          user_id?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          is_hidden?: boolean
          post_id?: string
          report_cnt?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          post_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_url?: string | null
          post_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string | null
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: number
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          cmt_cnt: number
          content: string
          created_at: string
          id: string
          is_anonymity: boolean
          is_hidden: boolean
          like_cnt: number
          report_cnt: number
          user_id: string | null
        }
        Insert: {
          cmt_cnt?: number
          content: string
          created_at?: string
          id?: string
          is_anonymity: boolean
          is_hidden?: boolean
          like_cnt?: number
          report_cnt?: number
          user_id?: string | null
        }
        Update: {
          cmt_cnt?: number
          content?: string
          created_at?: string
          id?: string
          is_anonymity?: boolean
          is_hidden?: boolean
          like_cnt?: number
          report_cnt?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          id: number
          reason: string
          reason_memo: string | null
          reporter_id: string
          target_id: string
          target_type: Database["public"]["Enums"]["report_enum"]
        }
        Insert: {
          created_at?: string
          id?: number
          reason: string
          reason_memo?: string | null
          reporter_id?: string
          target_id?: string
          target_type: Database["public"]["Enums"]["report_enum"]
        }
        Update: {
          created_at?: string
          id?: number
          reason?: string
          reason_memo?: string | null
          reporter_id?: string
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          delete_at: string | null
          email: string
          id: string
          introduce: string | null
          is_delete: boolean | null
          nickname: string
          provider: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          delete_at?: string | null
          email: string
          id?: string
          introduce?: string | null
          is_delete?: boolean | null
          nickname: string
          provider?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          delete_at?: string | null
          email?: string
          id?: string
          introduce?: string | null
          is_delete?: boolean | null
          nickname?: string
          provider?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_account: {
        Args: { uid: string }
        Returns: undefined
      }
      deleteaccount: {
        Args: { uid: string }
        Returns: undefined
      }
      get_comment_with_user: {
        Args: Record<PropertyKey, never> | { pid: string }
        Returns: Json[]
      }
      get_liked_posts_with_user: {
        Args: { uid: string }
        Returns: Json[]
      }
      get_post_with_images_and_user_by_id: {
        Args: { pid: string } | { pid: string; uid: string }
        Returns: Json
      }
      get_posts_with_images_and_user: {
        Args: {
          uid: string
          sort: string
          only_mine?: boolean
          target_user_id?: string
          keyword?: string
        }
        Returns: Json[]
      }
    }
    Enums: {
      report_enum: "post" | "comment"
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
    Enums: {
      report_enum: ["post", "comment"],
    },
  },
} as const
