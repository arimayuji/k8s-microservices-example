import { FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/fastify.types";
import { AuthController } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyTypedInstance, controller: AuthController) {
  
  app.post('/auth/login', async (request: FastifyRequest<{Body: { email: string; password: string }}>, reply) => {
    try {
      const { email, password } = request.body;

      const token = await controller.login(email, password);

      if (token === "User not found") {
        return reply.status(404).send({ error: "User not found" });
      }

      reply.send({ token });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao processar login" });
    }
  });

  app.get("/auth/users/:email", async (request: FastifyRequest<{ Params: { email: string } }>, reply) => {
    try {
      const email = request.params.email;
      const users = await controller.findUserByEmail(email);

      if (!users) {
        return reply.status(404).send({ error: "User not found" });
      }

      reply.send({ users });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar usuário" });
    }
  });

  app.post("/auth/register", async (request: FastifyRequest<{ Body: { email: string; password: string } }>, reply) => {
    try {
      const { email, password } = request.body;

      const result = await controller.registerUser(email, password);

      if (result === "User already exists") {
        return reply.status(400).send({ error: "User already exists" });
      }

      reply.send({ message: result });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao registrar usuário" });
    }
  });

  app.put("/auth/reset-password", async (request: FastifyRequest<{ Body: { email: string; newPassword: string } }>, reply) => {
    try {
      const { email, newPassword } = request.body;

      const result = await controller.resetPassword(email, newPassword);

      if (result === "User not found") {
        return reply.status(404).send({ error: "User not found" });
      }

      reply.send({ message: result });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao resetar senha" });
    }
  });
}
