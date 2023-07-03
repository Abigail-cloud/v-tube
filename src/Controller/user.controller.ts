import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Interfaces/user.type";
import UserService from "../Services/user.services";
import {StatusCodes} from'http-status-codes';
import log from "../Utilities/logger";
import { parseInt } from "lodash";

export class UserHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body,
        (req as any).user?.id
      );
      console.log((req as any).user);
      
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10); // Convert req.params.id to a number
      await this.userService.deleteUser(userId, (req as any).user?.id);
      res.status(200).json('User has been deleted.');
    } catch (err) {
      next(err);
    }
  }

  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10); // Convert req.params.id to a number
      const user = await this.userService.getUser(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

