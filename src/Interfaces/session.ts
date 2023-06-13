export interface Session {
    id: number;
    user_id: number;
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
  }