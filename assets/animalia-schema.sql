CREATE TABLE "animals" (
  "id" int PRIMARY KEY,
  "name" varchar(100),
  "scientificName" varchar(100),
  "speed" float,
  "class" varchar(100),
  "domain" varchar(100),
  "family" varchar(100),
  "created_at" datetime,
  "updated_at" datetime
);

CREATE TABLE "foods" (
  "id" int PRIMARY KEY,
  "animal_id" int,
  "name" varchar(50),
  "status" varchar(10),
  "created_at" datetime,
  "updated_at" datetime
);

ALTER TABLE "foods" ADD FOREIGN KEY ("animal_id") REFERENCES "animals" ("id");
