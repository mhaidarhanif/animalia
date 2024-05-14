type Animal = {
  id: number;
  name: string;
  scientificName?: string;
  speed?: number;
  class?: string;
  domain?: string;
  family?: string;
};

export const dataAnimals: Animal[] = [
  {
    id: 1,
    name: "Bear",
    scientificName: "Ursidae",
    class: "Mammalia",
    domain: "Eukaryota",
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
