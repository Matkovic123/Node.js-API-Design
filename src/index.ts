import * as dotenv from 'dotenv'; // load all env vars into process.env
dotenv.config(); // you want this at the very entry to the server

import app from './server';


app.listen(3001, () => {
    console.log('listening on http://localhost:3001');
})