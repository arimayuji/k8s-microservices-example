import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/fastify.types";
import { IUserRepository } from "../repositories/user.repository.mock";
import { User } from "../models/user.model";

export async function userRoutes(app: FastifyTypedInstance, repository: IUserRepository) {

  app.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.body as User;

    try {
      const createdUser = await repository.createUser(user);
      reply.status(201).send(createdUser);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create user" });
    }

  })

  app.get("users/:id", async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    const id = request.params.id;

    try {
      const user = await repository.findById(id);
      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send({ error: "Failed to find user" });
    }

  })

  app.put("/users/:id", async (request: FastifyRequest<{ Params: { id: string }, Body: Partial<User> }>, reply: FastifyReply) => {
    const id = request.params.id;
    const user = request.body as Partial<User>;

    try {
      const updatedUser = await repository.updateUser(id, user);
      reply.status(200).send(updatedUser);
    } catch (error) {
      reply.status(500).send({ error: "Failed to update user" });
    }
  })

  app.delete("/users/:id", async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    const id = request.params.id;

    try {
      await repository.deleteUser(id);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: "Failed to delete user" });
    }
  })
  
}