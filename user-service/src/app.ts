import fastify from "fastify";
import { userRoutes } from "./routes/user.routes";
import { jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { InMemoryRepository } from "./repositories/user.repository.mock";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const start = async () => {
  try {
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "User Service API",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${PORT}` }],
      },
      transform: jsonSchemaTransform,
    });

    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });

    await app.register((instance, opts, done) => {
      const repository = new InMemoryRepository();
      const service = new UserService(repository);
      const controller = new UserController(service);

      userRoutes(instance, controller);
      done();
    });

    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`🚀 Server running at http://localhost:${PORT}`);

  } catch (err) {
    app.log.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
