import { type Animal } from "@prisma/client";

export type DataAnimal = Omit<Animal, "createdAt" | "updatedAt">;

export const dataAnimals: DataAnimal[] = [
  {
    id: 1,
    name: "Bear",
    scientificName: "Ursidae",
    class: "Mammalia",
    domain: "Eukaryota",
    family: "",
    speed: 48, // km/h
  },
  {
    id: 2,
    name: "Cat",
    scientificName: "Felis catus",
    class: "Mammalia",
    domain: "Eukaryota",
    family: "Felidae",
    speed: 48, // km/h
  },
  {
    id: 3,
    name: "Dog",
    scientificName: "Canis lupus familiaris",
    class: "Mammalia",
    domain: "Eukaryota",
    family: "Canidae",
    speed: 60, // km/h
  },
];
