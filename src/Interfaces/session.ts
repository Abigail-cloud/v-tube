export interface Session {
  id: number;
  user: number;
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updated_at: Date;
}