import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import AuthSessionservice from "../Services/auth.session";
import { StatusCodes } from "http-status-codes";
import config from "config";
import log from "../Utilities/logger";

export default class SessionHandler {
  private authService = new AuthSessionservice();
  
  public async signup(
    req: Request<{}, {}, CreateUserInput['body']>,
    res: Response
  ) {
    try {
      const user = await this.authService.register(req.body);
      return res.send(user);
    } catch (e: any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }

  public async signin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.authService.signin(req.body.email, req.body.password);
      res
        .cookie('access_token', result.token, {
          httpOnly: true,
        })
        .status(200)
        .json({ messge: `Welcome ${result.user.user_name}, You are signed in!` });
    } catch (err) {
      next(err);
    }
  }
  public  static async googleAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await AuthSessionservice.googleAuth(req.body); 
      res
        .cookie('access_token', result.token, {
          httpOnly: true,
        })
        .status(200)
        .json(result.user);
    } catch (err) {
      next(err);
    }
  }
}
