import { type Animal } from "@prisma/client";

import animalsJSON from "./animals.json";
import slugify from "slugify";

export type DataAnimal = Omit<Animal, "id" | "createdAt" | "updatedAt">;

export const dataAnimals: DataAnimal[] = [
  { slug: "bear", name: "Bear", speed: 48, color: "brown" },
  { slug: "cat", name: "Cat", speed: 48, color: "orange" },
  { slug: "dog", name: "Dog", speed: 60, color: "white" },
  ...animalsJSON.map((animalName) => ({
    slug: slugify(animalName),
    name: animalName,
    speed: null,
    color: null,
  })),
];
