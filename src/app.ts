import express from 'express';
import {event_Router} from './routers/event.router.js'
import { userRouter } from './routers/user.router.js';
import {errorhandler} from './middlewares/error_handler.js'
import {rout_notfound } from './middlewares/router_notfound.js';
import { publicEventRouter } from './routers/public_event.router.js';
import { availabilityExceptionRouter } from './routers/availability_exception.router.js';
import { availabilityRouter } from './routers/availability.router.js';
import { bookingRouter } from './routers/booking.router.js';
const app = express();
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/events', event_Router);
app.use('/api/availability-exceptions', availabilityExceptionRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/public',publicEventRouter);
app.use(rout_notfound)
app.use(errorhandler)
export {app};
