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

  // public async subscribe(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     await this.userService.subscribe(req.user.id, req.params.id);
  //     res.status(200).json('Subscription successful.');
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async unsubscribe(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     await this.userService.unsubscribe(req.user.id, req.params.id);
  //     res.status(200).json('Unsubscription successful.');
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async like(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     await this.userService.like(req.user.id, req.params.videoId);
  //     res.status(200).json('The video has been liked.');
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async dislike(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     await this.userService.dislike(req.user.id, req.params.videoId);
  //     res.status(200).json('The video has been disliked.');
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

