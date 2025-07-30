import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/fastify.types";
import { User } from "../models/user.model";
import { UserController } from "../controllers/user.controller";

export async function userRoutes(app: FastifyTypedInstance, controller: UserController) {
  app.post("/users", async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
    const user = request.body;

    try {
      const createdUser = await controller.createUser(user);
      reply.status(201).send(createdUser);
    } catch (error) {
      reply.status(500).send({ error: "Failed to create user" });
    }

  })

  app.get("/users/:id", async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    const id = request.params.id;

    try {
      const user = await controller.findById(id);
      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send({ error: "Failed to find user" });
    }

  })

  app.put("/users/:id", async (request: FastifyRequest<{ Params: { id: string }, Body: Partial<User> }>, reply: FastifyReply) => {
    const id = request.params.id;
    const user = request.body as Partial<User>;

    try {
      const updatedUser = await controller.updateUser(id, user);
      reply.status(200).send(updatedUser);
    } catch (error) {
      reply.status(500).send({ error: "Failed to update user" });
    }
  })

  app.delete("/users/:id", async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    const id = request.params.id;

    try {
      await controller.deleteUser(id);
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: "Failed to delete user" });
    }
  })

}