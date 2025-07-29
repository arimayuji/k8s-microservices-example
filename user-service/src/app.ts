import fastify from "fastify";
import { userRoutes } from "./routes/user.routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { InMemoryRepository } from "./repositories/user.repository.mock";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

const PORT = 8080;

const start = async () => {
  try {
    await app.register((instance, opts, done) => {
      const repository = new InMemoryRepository();
      userRoutes(instance, repository);
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