import { Hono } from "hono";

import { Animal, dataAnimals } from "./data/animals.ts";
import { prisma } from "./lib/db.ts";

let animalsArray = dataAnimals;

const app = new Hono();

// `/animals`     | `GET`    | Get all animals     |
// `/animals/:id` | `GET`    | Get animal by id    |
// `/animals`     | `POST`   | Add new animal      |
// `/animals`     | `DELETE` | Delete all animals  |
// `/animals/:id` | `DELETE` | Delete animal by id |
// `/animals/:id` | `PUT`    | Update animal by id |

// app.post("/animals/seed", async (c) => {
//   animalsArray = dataAnimals;
//   return c.json(animalsArray);
// });

app.get("/", (c) => {
  return c.json({ message: "Hello world" });
});

app.get("/animals", async (c) => {
  const animals = await prisma.animal.findMany();
  return c.json(animals);
});

app.get("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  return c.json(animal);
});

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const animalData = {
    name: body.name,
  };

  const animal = await prisma.animal.create({
    data: animalData,
  });

  return c.json({ animal });
});

app.delete("/animals", async (c) => {
  const result = await prisma.animal.deleteMany();

  return c.json({
    message: "All animals data have been removed",
    result,
  });
});

app.delete("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const deletedAnimal = await prisma.animal.delete({
    where: { id },
  });

  return c.json({
    message: `Deleted animal with id ${id}`,
    deletedAnimal,
  });
});

app.put("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const animalData = {
    name: body.name,
  };

  const updatedAnimal = await prisma.animal.update({
    where: { id },
    data: animalData,
  });

  return c.json({
    message: `Updated animal with id ${id}`,
    updatedAnimal,
  });
});

console.log("Animalia API is running");

export default app;
