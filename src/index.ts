import { Hono } from "hono";

import { Animal, dataAnimals } from "./data/animals.ts";
import { client } from "./lib/db.ts";

await client.connect();

let animalsArray = dataAnimals;

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

app.get("/animals", async (c) => {
  const res = await client.query("SELECT * FROM animals");
  const animals = res.rows as Animal[];
  return c.json(animals);
});

app.get("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const res = await client.query(`SELECT * FROM animals WHERE id = ${id}`);

  const animal = res.rows[0] as Animal;

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  return c.json(animal);
});

app.post("/animals/seed", async (c) => {
  animalsArray = dataAnimals;
  return c.json(animalsArray);
});

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const nextId = animalsArray[animalsArray.length - 1].id + 1;

  const newAnimal = {
    id: nextId,
    name: body.name,
    scientificName: body.scientificName,
    speed: body.speed,
    class: body.class,
    domain: body.domain,
    family: body.family,
  };

  animalsArray = [...animalsArray, newAnimal];

  return c.json({ animal: newAnimal });
});

app.delete("/animals", (c) => {
  animalsArray = [];

  return c.json({ message: "All animals data have been removed" });
});

app.delete("/animals/:id", (c) => {
  const id = Number(c.req.param("id"));

  const animal = animalsArray.find((animal) => animal.id === id);

  if (!animal) {
    c.status(404);
    return c.json({ message: "Animal not found" });
  }

  const updatedAnimals = animalsArray.filter((animal) => animal.id !== id);

  animalsArray = updatedAnimals;

  return c.json({
    message: `Deleted animal with id ${id}`,
  });
});

app.put("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const animal = animalsArray.find((animal) => animal.id === id);

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

  const updatedAnimals = animalsArray.map((animal) => {
    if (animal.id === id) {
      return newAnimal;
    } else {
      return animal;
    }
  });

  animalsArray = updatedAnimals;

  return c.json({
    message: `Updated animal with id ${id}`,
    animal: newAnimal,
  });
});

console.log("Animalia API is running");

export default app;
