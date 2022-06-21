FROM node:lts-alpine3.16
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN apk add --no-cache git openssh
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]