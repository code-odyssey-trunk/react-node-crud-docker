# API using node, Postgres, Sequelize, and Docker

Navigate to root (where the docker-compose.yml is located) and build the image

```
docker-compose build
```

To run the database:

```
docker-compose up -d nb_db
```

To run the backend

```
docker-compose up -d doc_container_2
```

To run database and backend

```
docker-compose up
```

Backend runs on [http://localhost:3001](http://localhost:3001).
