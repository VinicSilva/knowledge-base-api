FROM node:16-alpine

WORKDIR /app

COPY . ./
RUN yarn install && yarn build

COPY . ./

EXPOSE 6000

CMD [ "yarn", "dev" ]