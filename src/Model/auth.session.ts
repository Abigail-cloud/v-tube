import { Model } from "objection";
import User from "../Model/user.model";
import { Session } from "../Interfaces/session";


export class SessionModel extends Model implements Session {
  id!: number;
  user_id!: number;
  valid!: boolean;
  userAgent!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = "sessions";

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "sessions.user_id",
        to: "users.id",
      },
    },
  };
}
