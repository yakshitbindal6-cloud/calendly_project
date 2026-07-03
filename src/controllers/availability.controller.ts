import type { Request, Response } from "express";
import { send_success } from "../utils/api_response.js";
import {
  create_availability,
  get_user_availability,
  get_user_active_availability,
  get_availability_byID,
  update_availability,
  remove_availability,
} from "../services/availability.service.js";

export async function add_availability(req: Request, res: Response) {
  const user_id = req.user_id;
  const data = await create_availability(user_id, req.body);
  send_success(res, data, "availability successfully created");
}

export async function list_user_availability(req: Request, res: Response) {
  const user_id = req.user_id;
  const data = await get_user_availability(user_id);
  send_success(res, data);
}

export async function list_user_active_availability(req: Request, res: Response) {
  const user_id = req.user_id;
  const data = await get_user_active_availability(user_id);
  send_success(res, data);
}

export async function get_availability_byID_controller(req: Request, res: Response) {
  const user_id = req.user_id;
  const { pref_id } = req.params;
  const data = await get_availability_byID(user_id, Number(pref_id));
  send_success(res, data);
}

export async function patch_availability(req: Request, res: Response) {
  const user_id = req.user_id;
  const { pref_id } = req.params;
  const data = await update_availability(user_id, Number(pref_id), req.body);
  send_success(res, data, "availability successfully updated");
}

export async function delete_availability(req: Request, res: Response) {
  const user_id = req.user_id;
  const { pref_id } = req.params;
  const data = await remove_availability(user_id, Number(pref_id));
  send_success(res, data, "availability successfully deleted");
}
