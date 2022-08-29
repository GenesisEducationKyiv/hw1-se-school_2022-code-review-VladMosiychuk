FROM node:16.16.0-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:16.16.0-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --from=builder /app/build/ .
EXPOSE 8000
ENTRYPOINT [ "/sbin/tini", "--", "node", "app.js" ]