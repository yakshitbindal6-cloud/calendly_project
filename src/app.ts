import express from 'express';
import {event_Router} from './routers/event.router.js'
import { aval_Router, user_avilRouter, userRouter } from './routers/user.router.js';
import {errorhandler} from './middlewares/error_handler.js'
import {rout_notfound } from './middlewares/router_notfound.js';
const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timeStamp:new Date().toISOString()
    });
});
app.use('/users',userRouter);// if request starts with /users then it will be handled by userRouter
app.use('/user_availability',user_avilRouter);
app.use('/store_availability',aval_Router);
app.use('/events',event_Router);
app.use('/events/user',event_Router);
app.use(rout_notfound)
app.use(errorhandler)
export {app};
