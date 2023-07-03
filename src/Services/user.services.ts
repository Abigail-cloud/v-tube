import { UserInfo, UserInput } from "../Interfaces/user.type";
import User from "../Model/user.model";
import ErrorUtil from "../Utilities/Error/create,error";
 export default class UserService {
   public async updateUser(
     id: string,
     body: object,
     userId: string
   ): Promise<any> {
     if (id !== userId) {
       throw ErrorUtil.createError(403, 'You can update only your account!');
     }
     const updatedUser = await User
       .query()
       .findById(id)
       .patch(body)
       .returning('*');
     return updatedUser;
   }

   public async deleteUser(id: number, userId: number): Promise<string> {
     if (id !== userId) {
       throw ErrorUtil.createError(403, 'You can delete only your account!');
     }

     await User.query().findById(id).delete();
     return 'User has been deleted.';
   }

   public async getUser(id: number): Promise<any> {
     const user = await User.query().findById(id);
     return user;
   }

  //  public async subscribe(
  //    userId: string,
  //    subscribedUserId: string
  //  ): Promise<string> {
  //    await this.userModel
  //      .query()
  //      .findById(userId)
  //      .patch({
  //        subscribedUsers: this.knex.raw(
  //          `array_append(subscribedUsers, ?)`,
  //          subscribedUserId
  //        ),
  //      });
  //    await this.userModel
  //      .query()
  //      .findById(subscribedUserId)
  //      .increment('subscribers', 1);
  //    return 'Subscription successful.';
  //  }

  //  public async unsubscribe(
  //    userId: string,
  //    subscribedUserId: string
  //  ): Promise<string> {
  //    await this.userModel
  //      .query()
  //      .findById(userId)
  //      .patch({
  //        subscribedUsers: this.knex.raw(
  //          `array_remove(subscribedUsers, ?)`,
  //          subscribedUserId
  //        ),
  //      });
  //    await this.userModel
  //      .query()
  //      .findById(subscribedUserId)
  //      .decrement('subscribers', 1);
  //    return 'Unsubscription successful.';
  //  }

  //  public async like(userId: string, videoId: string): Promise<string> {
  //    await this.videoModel
  //      .query()
  //      .findById(videoId)
  //      .patch({
  //        likes: this.knex.raw(`array_append(likes, ?)`, userId),
  //        dislikes: this.knex.raw(`array_remove(dislikes, ?)`, userId),
  //      });
  //    return 'The video has been liked.';
  //  }

  //  public async dislike(userId: string, videoId: string): Promise<string> {
  //    await this.videoModel
  //      .query()
  //      .findById(videoId)
  //      .patch({
  //        dislikes: this.knex.raw(`array_append(dislikes, ?)`, userId),
  //        likes: this.knex.raw(`array_remove(likes, ?)`, userId),
  //      });
  //    return 'The video has been disliked.';
  //  }
 }