import express from 'express';
import routes from './routes';
import connect from './Utilities/connect';
import config from 'config';
import cookieParser from "cookie-parser"
import  deserializeUser  from './Middleware/deserialize.user';


const app = express();
app.use(cookieParser());
app.use(express.json());

const port = config.get<number>('port');

// app.use(deserializeUser);
app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);

    connect();
    routes(app);
})