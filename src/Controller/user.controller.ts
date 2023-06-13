import { Request, Response } from "express";
import { UserInfo } from "../Interfaces/user.type";
import Authservice from "../Services/user.services";
import {StatusCodes} from'http-status-codes';
import { CreateUserInput } from "../schema/user.schema";
import log from "../Utilities/logger";


export class AuthHandler {
    private auth_service = new Authservice;
    public async createUserHandler (
        req: Request<{}, {}, CreateUserInput["body"]>,
        res: Response
      ) {
        try {
          const user = await this.auth_service.register(req.body);
          return res.send(user);
        } catch (e: any) {
          log.error(e);
          return res.status(409).send(e.message);
        }
}
}
