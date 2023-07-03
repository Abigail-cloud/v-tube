import { Model } from "objection";
import User from "../Model/user.model";
import { Session } from "../Interfaces/session";


export class SessionModel extends Model {
  id!: number;
  user!: number;
  valid!: boolean;
  userAgent!: string;
  createdAt!: Date;
  updated_at!: Date;

  static tableName = 'sessions';

  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'sessions.user',
        to: 'users.id',
      },
    },
  };
}
