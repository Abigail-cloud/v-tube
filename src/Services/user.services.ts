import { UserInfo, UserInput } from "../Interfaces/user.type";
import User from "../Model/user.model";
import {comparePassword, encryptPassword} from '../Utilities/Encrypt';
import {omit} from 'lodash';



 export default class Authservice {
    
    public async register (payload : UserInput) : Promise<User>{
        try {
            const hashPassword = encryptPassword(payload.password)
            const user = await User.query().insert({
                ...payload,
                password: hashPassword
            });
            return omit((user).toJSON(), "password") as User;
        } catch (error : any) {
            throw new Error(error);
        }
      
    }

    public async validatePassword (email : string, password : string) : Promise<boolean>{
        const user = await User.query().findOne({email});
        if(!user){
            return false;
        }
        const isValid = comparePassword(password, user.password);
        return isValid;
    }

    public async findUser (query : any): Promise<User | undefined>{
        const user = await User.query().findOne(query)
        return user;
    }
}