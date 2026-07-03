import type { Request, Response } from "express";
import { send_success } from "../utils/api_response.js";
import {
  create_availability_exception,
  find_availability_exception_byID,
  find_availability_exception_byUser,
  remove_availability_exception,
  update_availability_exception,
} from "../services/availability_exception.service.js";

export async function add_availability_exception(req: Request, res: Response) {
  const user_id = req.user_id;
  const data = await create_availability_exception(user_id, req.body);
  send_success(res, data, "availability exception successfully created");
}

export async function list_user_availability_exceptions(req: Request, res: Response) {
  const user_id = req.user_id;
  const data = await find_availability_exception_byUser(user_id);
  send_success(res, data);
}

export async function get_availability_exception_byID_controller(req: Request, res: Response) {
  const user_id = req.user_id;
  const { availability_exception_id } = req.params;
  const data = await find_availability_exception_byID(user_id, Number(availability_exception_id));
  send_success(res, data);
}

export async function patch_availability_exception(req: Request, res: Response) {
  const user_id = req.user_id;
  const { availability_exception_id } = req.params;
  const data = await update_availability_exception(user_id, Number(availability_exception_id), req.body);
  send_success(res, data, "availability exception successfully updated");
}

export async function delete_availability_exception(req: Request, res: Response) {
  const user_id = req.user_id;
  const { availability_exception_id } = req.params;
  const data = await remove_availability_exception(user_id, Number(availability_exception_id));
  send_success(res, data, "availability exception successfully deleted");
}
