FROM node:14 as build
WORKDIR /core
COPY package.json package-lock.json ./
RUN npm ci
RUN npm build

FROM node:14 as app
WORKDIR /core
COPY --from=build /core/node_modules node_modules
ADD . ./

EXPOSE 7000

CMD npm run migration:up && npm start
