import { Hono } from "hono";

import { dataAnimals } from "./data/animals";

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

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const nextId = animals[animals.length - 1].id + 1;

  const newAnimal = {
    id: nextId,
    name: body.name,
  };

  animals = [...animals, newAnimal];

  return c.json({ animal: newAnimal });
});

export default app;
