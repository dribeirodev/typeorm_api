import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getRepository(User).find();
  return res.json(users);
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  return res.json(user);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = getRepository(User).create(req.body);
  const user = await getRepository(User).save(newUser);
  return res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    getRepository(User).merge(user, req.body);
    const updateUser = await getRepository(User).save(user);
    return res.json(updateUser);
  }
  return res.status(404).json({ msg: "Not user found" });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).delete(req.params.id);
  return res.json(user);
};
