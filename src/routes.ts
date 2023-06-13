import {Express, Request, Response} from 'express';
import { AuthHandler } from './Controller/user.controller';
import { createUserSchema } from './schema/user.schema';
import { validate } from './Middleware/validate-resorce';

const authHandler = new AuthHandler;

function routes(app : Express){

    app.get('/statusCheck', (req, res)=>{
        res.send("Hello! V-tube")
        });

    app.post('/api/auth', validate(createUserSchema),authHandler.createUserHandler.bind(authHandler))

}
export default routes;