ARG BASE=node:16-bullseye


FROM ${BASE} AS dependencies
WORKDIR /app
ENV NODE_ENV development

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install
RUN npx prisma generate
RUN rm -rf prisma


RUN mkdir -p .next
RUN chown node:node . node_modules .next
RUN chown -R node:node node_modules/.prisma

USER node


EXPOSE 3000
ENV PORT 3000

CMD [ "yarn", "cmd:start:dev" ]