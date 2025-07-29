import fastify from "fastify";

const app = fastify({
  logger: true,
})

const PORT = 8080;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`🚀 Server running on port ${PORT}`);

    await app.ready();
  } catch (err) {
    app.log.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();