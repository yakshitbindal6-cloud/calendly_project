import { Router } from "express";
import { modify_user,removeUser,register_user,find_user, findall_users, find_availability, add_availability } from "../controllers/user.controller.js";
import { validate, validateParams } from '../middlewares/validate.js';
import { removeUserSchema, updateUserSchema, userSchema } from "../dtos/user_dto.js";
import { availability_Schema } from "../dtos/availability_dto.js";
export const userRouter=Router();// we will see the router after /users
export const user_avilRouter=Router();
export const aval_Router=Router();
userRouter.get('/',findall_users);
userRouter.get('/:id',find_user);
userRouter.post('/',validate(userSchema),register_user);
userRouter.delete('/:id',validateParams(removeUserSchema),removeUser);
userRouter.put("/:id", validateParams(removeUserSchema), validate(updateUserSchema), modify_user);
user_avilRouter.get("/:id",find_availability)
aval_Router.post('/',validate(availability_Schema),add_availability)
