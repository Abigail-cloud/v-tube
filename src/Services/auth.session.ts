import { get } from "lodash";
import config from "config"
import { Session } from "../Interfaces/session";
import { SessionModel } from "../Model/auth.session";
import { signJwt, verifyJwt } from "../Utilities/jwt.utils";
import Authservice from "./user.services";


const authService = new Authservice;

export default class AuthSessionservice {
    
    public async createSessions (userId : number, userAgent : string) : Promise<Session>{
        const userSession = await SessionModel.query().insert({user_id: userId,userAgent});
        return userSession;
    } 
    public async findSession (query : object) : Promise<Session[]>{
        const userSession = await SessionModel.query().where(query)
        return userSession;
    }
    
    public async updateSession (query : object, update: object) : Promise<void>{
       await SessionModel.query().where(query).patch(update)
    } 

    public async re_issueAccessToken (refreshToken : string) : Promise<string |false>{
       const decoded = verifyJwt(refreshToken, "refreshTokenPublicKey");
       
       if(!decoded || !get(decoded, "session")) return false;

       const session = await SessionModel.query().findById(get(decoded, "session"));
       if(!session || !session.valid) return false;
       const user = await authService.findUser({id :session.user_id });
       if(!user) return false;
       const accessToken = signJwt(
        {...user, session : session.id},
        "accessTokenPrivateKey",
        {expiresIn: config.get("accessTokenTtl")}
       );
       return accessToken; 
    } 
}