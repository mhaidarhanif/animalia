# Animalia Backend REST API

## REST API Endpoints

- Production: `https://animalia.haidar.dev`
- Local: `http://localhost:3000`

| Endpoint        | HTTP     | Description              |
| --------------- | -------- | ------------------------ |
| `/animals`      | `GET`    | Get all animals          |
| `/animals/:id`  | `GET`    | Get animal by id         |
| `/animals/seed` | `POST`   | Seed all initial animals |
| `/animals`      | `POST`   | Add new animal           |
| `/animals`      | `DELETE` | Delete all animals       |
| `/animals/:id`  | `DELETE` | Delete animal by id      |
| `/animals/:id`  | `PUT`    | Update animal by id      |

## Database Design/Schema/ERD

![ERD](./assets/animalia-erd.svg)

## Getting Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

Open <http://localhost:3000>.
