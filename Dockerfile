FROM node:18.17.0-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY yarn.lock yarn.lock

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false \
  --ignore-script

COPY --chown=node:node . .
RUN yarn build

RUN rm -rf node_modules
ENV NODE_ENV=production
RUN yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

# ---

FROM node:18.17.0-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE ${PORT}

CMD ["node", "dist/main.js"]