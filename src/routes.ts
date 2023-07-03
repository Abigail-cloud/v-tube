import {Express, Request, Response} from 'express';
import { UserHandler } from './Controller/user.controller';
import SessionHandler from './Controller/auth.session.controller';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/auth.session.schema';
import { validate } from './Middleware/validate-resorce';
import UserService from './Services/user.services';
import deserializeUser from './Middleware/deserialize.user';

const userService = new UserService();
const userHandler = new UserHandler(userService);
const sessionHandler = new SessionHandler;

function routes(app : Express){

    app.get('/statusCheck', (req, res)=>{
        res.send("Hello! V-tube")
        });

    app.post(
      '/api/signup',
      validate(createUserSchema),
      sessionHandler.signup.bind(sessionHandler)
    );
    app.post('/api/signin', validate(createSessionSchema),sessionHandler.signin.bind(sessionHandler));
    app.post('/api/fromGoogle', SessionHandler.googleAuth.bind(sessionHandler));
    app.put('/api/updateUser', userHandler.update.bind(userHandler));
    app.delete('/api/deleteUser', userHandler.deleteUser.bind(sessionHandler));
    app.get('/api/user/:id',deserializeUser, userHandler.getUser.bind(userHandler));
}
export default routes;