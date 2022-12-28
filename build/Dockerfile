FROM node:alpine

WORKDIR /usr/app

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml

COPY packages packages

RUN npm i -g pnpm

RUN pnpm install
RUN pnpm build

ENTRYPOINT pnpm start:prod