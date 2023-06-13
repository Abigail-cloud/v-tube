import express from 'express';
import routes from './routes';
import connect from './Utilities/connect';
import config from 'config';



const app = express();
app.use(express.json());

const port = config.get<number>('port');


app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);

    connect();
    routes(app);
})