import fastify from "fastify";
import { jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { InMemoryRepository } from "./repositories/auth.repository.mock";
import { authRoutes } from "./routes/auth.routes";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

const PORT = 8081;

const start = async () => {
  try {
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Auth Service API",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 8081}` }],
      },
      transform: jsonSchemaTransform,
    });
    
    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });
    
    await app.register((instance, opts, done) => {
      const repository = new InMemoryRepository();
      const service = new AuthService(repository);
      const controller = new AuthController(service);

      authRoutes(instance, controller)
      
      done();
    })

    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`🚀 Server running on port ${PORT}`);

    await app.ready();
  } catch (err) {
    app.log.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();