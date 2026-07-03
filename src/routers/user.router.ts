import { Router } from "express";
import { modify_user,removeUser,register_user,find_user, findall_users } from "../controllers/user.controller.js";
import { validate, validateParams } from '../middlewares/validate.js';
import { removeUserSchema, updateUserSchema, userSchema } from "../dtos/user_dto.js";
export const userRouter=Router();// we will see the router after /users
userRouter.get('/',findall_users);
userRouter.get('/:id',find_user);
userRouter.post('/',validate(userSchema),register_user);
userRouter.delete('/:id',validateParams(removeUserSchema),removeUser);
userRouter.put("/:id", validateParams(removeUserSchema), validate(updateUserSchema), modify_user);
