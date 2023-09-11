/*import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.write("Oi");
  return response.end();
});

server.listen(8000);
 */

import { fastify } from "fastify";
import { DatabasePostegres } from "./database-postegres.js";

//import { DatabaseMemory } from "./database-memory.js";
//const database = new DatabaseMemory();
const server = fastify();

const database = new DatabasePostegres();

server.get("/", () => {
  return "Hello world";
});

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;
  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);
  return videos;
});

/*
server.get("/videos/filter", (request) => {
  const search = request.query.search;
  const videos = database.listFilter(search);
  return videos;
});*/

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;
  await database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);
  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 8000,
});
