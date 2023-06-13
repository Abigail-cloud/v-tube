import {Model} from 'objection';


export default class User extends Model {
    static tableName = 'users';
    id!: number;
    user_name!: string;
    email!: string;
    password! : string;
    phone_number!: number;
    subscribers!: string;
    subscribedUsers! : string[];
    img!: string;
    from_google!:boolean;
    createdAt!: Date;
    updatedAt!: Date;
  }
