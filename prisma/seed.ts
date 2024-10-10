import { PrismaClient } from "@prisma/client";

import { dataAnimals } from "../src/data/animals.ts";

const prisma = new PrismaClient();

async function main() {
  for (const animal of dataAnimals) {
    await prisma.animal.upsert({
      where: { slug: animal.slug }, // Assuming name is unique
      update: animal,
      create: animal,
    });
    console.log(`🆕 Animal: ${animal.name}`);
  }

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
