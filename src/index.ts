import { Hono } from "hono";

import { dataAnimals } from "./data/animals.ts";

let animals = dataAnimals;

const app = new Hono();

// `/animals`     | `GET`    | Get all animals     |
// `/animals/:id` | `GET`    | Get animal by id    |
// `/animals`     | `POST`   | Add new animal      |
// `/animals`     | `DELETE` | Delete all animals  |
// `/animals/:id` | `DELETE` | Delete animal by id |
// `/animals/:id` | `PUT`    | Update animal by id |

app.get("/", (c) => {
  return c.json({ message: "Hello world" });
});

app.get("/animals", (c) => {
  return c.json(animals);
});

app.get("/animals/:id", (c) => {
  const id = Number(c.req.param("id"));

  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  return c.json(animal);
});

app.post("/animals/seed", async (c) => {
  animals = dataAnimals;
  return c.json(animals);
});

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const nextId = animals[animals.length - 1].id + 1;

  const newAnimal = {
    id: nextId,
    name: body.name,
    scientificName: body.scientificName,
    speed: body.speed,
    class: body.class,
    domain: body.domain,
    family: body.family,
  };

  animals = [...animals, newAnimal];

  return c.json({ animal: newAnimal });
});

app.delete("/animals", (c) => {
  animals = [];

  return c.json({ message: "All animals data have been removed" });
});

app.delete("/animals/:id", (c) => {
  const id = Number(c.req.param("id"));

  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  const updatedAnimals = animals.filter((animal) => animal.id !== id);

  animals = updatedAnimals;

  return c.json({
    message: `Deleted animal with id ${id}`,
  });
});

app.put("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const animal = animals.find((animal) => animal.id === id);

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  const newAnimal = {
    ...animal,
    name: body.name || animal.name,
    scientificName: body.scientificName || animal.scientificName,
    speed: body.speed || animal.speed,
    class: body.class || animal.class,
    domain: body.domain || animal.domain,
    family: body.family || animal.family,
  };

  const updatedAnimals = animals.map((animal) => {
    if (animal.id === id) {
      return newAnimal;
    } else {
      return animal;
    }
  });

  animals = updatedAnimals;

  return c.json({
    message: `Updated animal with id ${id}`,
    animal: newAnimal,
  });
});

console.log("Animalia API is running");

export default app;
