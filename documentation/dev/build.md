I don't want to get too deep into the CI/CD rabbit hole with this application.

1. Build the client-side bundles from the development container (we could
   prepend this with a pipeline step)

   ```bash
      npm run dev
      docker exec -it docker_client_1 npm run build
   ```

2. Copy (over SSH or however else) the built files to the server. Note that this
   application isn't live yet, anywhere, but it'll probably end up in a
   DigitalOcean droplet.

## Mounting node_modules as a volume

We want `node_modules` (in client _and_ server) to be available on the host
machine (to make the IDE happy).

The following combination of configuration settings seems to work (see [this
StackOverflow answer](https://stackoverflow.com/a/66994382)):

-  `docker-compose.dev.yml`

   ```bash
   ...
   client:
         build:
            context: ../client
            dockerfile: Dockerfile
         volumes:
            - ../client:/rack/client
            - node_modules:/rack/client/node_modules
         ports:
            - "3000:3000"
   ...
   volumes:
      node_modules:
         driver: local
         driver_opts:
            type: none
            o: bind
            device: ../client/node_modules
   ```

-  client/Dockerfile

   ```bash
   FROM node:alpine

   WORKDIR /rack/client

   COPY package*.json .

   RUN npm install

   COPY . .
   EXPOSE 3000

   CMD ["npm", "run", "serve"]
   ```
