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

 }
