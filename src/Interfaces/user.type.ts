import User from "../Model/user.model";

export interface UserInfo{
    user_name: string,
    email: string,
    password : string,
    phone_number: number,
    subscribers: string,
    img: string;
    from_google :boolean,
}
export interface UserInput {
    email: string;
    user_name: string;
    password: string;
  }
  // Extend the Request interface to include the 'user' property
export interface CustomRequest extends Request {
  user: any; // Adjust the type according to your application's user object type
  cookies: any;
}